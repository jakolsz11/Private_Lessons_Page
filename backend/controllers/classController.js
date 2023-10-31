const Class = require('../models/ClassModel');
const User = require('../models/UserModel');
const {getTimeToNotification} = require('../utils/getTimeToNotification');

const getDispositions = async (req, res, next) => {
  try {
    const { days } = req.query;

    const dispositions = [];

    const findClasses = async () => {
      for (const day of days) {
        try {
          let element = {};
          const classes = await Class.find({ date: day, teacher: req.user._id }).sort({ start: 1 });
          if (classes.length === 0) {
            element = {
              date: day,
              classes: []
            }
          }
          else {
            element = {
              date: day,
              classes: classes
            }
          }

          dispositions.push(element);

        } catch (error) {
          next(error);
        }
      }
    }

    await findClasses();
    return res.json(dispositions);

  } catch (error) {
    next(error);
  }
};

const getClasses = async (req, res, next) => {
  try {

    const { days } = req.query;

    const dispositions = [];

    const findClasses = async () => {
      for (const day of days) {
        try {
          let element = {};
          const classes = await Class.find({ date: day, reserved: true, teacher: req.user._id }).populate("user", "-password").sort({ start: 1 });
          if (classes.length === 0) {
            element = {
              date: day,
              classes: []
            }
          }
          else {
            element = {
              date: day,
              classes: classes
            }
          }

          dispositions.push(element);
        } catch (error) {
          next(error);
        }
      }
    }

    await findClasses();

    return res.json(dispositions);

  } catch (error) {
    next(error);
  }
};

const getFreeClasses = async (req, res, next) => {
  try {

    const { days } = req.query;

    const dispositions = [];

    const findClasses = async () => {
      for (const day of days) {
        try {
          let element = {};
          const classes = await Class.find({ date: day, reserved: false }).populate("teacher", "-password").sort({ start: 1 });
          if (classes.length === 0) {
            element = {
              date: day,
              classes: []
            }
          }
          else {
            element = {
              date: day,
              classes: classes
            }
          }

          dispositions.push(element);
        } catch (error) {
          next(error);
        }
      }
    };

    await findClasses();

    return res.json(dispositions);

  } catch (error) {
    next(error);
  }
};

const addDisposition = async (req, res, next) => {
  try {
    const { newDispositionDay, startsTime, endsTime } = req.body;

    if (!newDispositionDay || !startsTime || !endsTime) {
      return res.status(400).send("All inputs are required");
    }

    const dispositionExists = await Class.findOne({
      date: newDispositionDay, $or: [
        {
          $and: [
            { end: { $gt: startsTime } },
            { end: { $lt: endsTime } }
          ]
        },
        {
          $and: [
            { start: { $gt: startsTime } },
            { start: { $lt: endsTime } }
          ]
        },
        {
          $and: [
            { start: { $eq: startsTime } },
            { end: { $eq: endsTime } }
          ]
        }
      ]
    });



    if (dispositionExists) {
      return res.send("you have class at this time");
    }

    const disposition = await Class.create({
      date: newDispositionDay,
      start: startsTime,
      end: endsTime,
      teacher: req.user._id,
    });

    return res.status(201).json({
      success: "disposition created",
      dispositionCreated: {
        _id: disposition._id,
        date: disposition.date,
        start: disposition.start,
        end: disposition.end,
        reserved: disposition.reserved,
        teacher: disposition.teacher
      }
    });

  } catch (error) {
    next(error);
  }
};

const deleteClasses = async (req, res, next) => {
  try {
    const classes = req.query.days;
    const title = req.query.title;

    if (classes && classes.length === 0) {
      return res.send("no classes selected");
    }

    const createTime = getTimeToNotification();

    const updateClasses = async () => {
      for (const newClass of classes) {
        try {
          let disp = await Class.findById(newClass).populate("teacher").orFail();
          if (disp.reserved) {
            let user = await User.findById(disp.user).orFail();

            const notification = {
              date: disp.date,
              time: disp.start + " - " + disp.end,
              person: disp.teacher.name + " " + disp.teacher.lastName,
              title: title,
              createTime: createTime,
            }

            user.notifications.unshift(notification);
            user.notificationsCounter += 1;

            await user.save();
          }

          await disp.remove();
        } catch (error) {
          next(error);
        }
      }

      return res.send("delete dispositions done");
    };

    updateClasses();

  } catch (error) {
    next(error);
  }
};

const signUpForClasses = async (req, res, next) => {
  try {
    const { lessonID, comment } = req.body;

    if (lessonID === "") {
      return res.send("no class selected");
    }

    let disp = await Class.findById(lessonID).orFail();
    let user = await User.findById(disp.teacher._id).orFail();

    if(!disp.reserved){

      const createTime = getTimeToNotification();
  
      disp.reserved = true;
      disp.user = req.user._id;
      disp.comment = comment;
  
      const notification = {
        date: disp.date,
        time: disp.start + " - " + disp.end,
        person: req.user.name + " " + req.user.lastName,
        title: "New lesson",
        createTime: createTime,
      }
  
      user.notifications.unshift(notification);
      user.notificationsCounter += 1;
  
      await disp.save();
      await user.save();
  
      return res.send("signed up for classes done");

    }
    else{
      return res.send("lesson is already reserved");
    }

  } catch (error) {
    next(error);
  }
};

const adminCancelClasses = async (req, res, next) => {
  try {
    const classes = req.body.days;
    const title = req.body.title;

    if (classes && classes.length === 0) {
      return res.send("no classes selected");
    }

    const updateClasses = async () => {
      for (const newClass of classes) {
        try {
          let disp = await Class.findById(newClass).populate("teacher").orFail();
          let user = await User.findById(disp.user).orFail();

          const createTime = getTimeToNotification();

          const notification = {
            date: disp.date,
            time: disp.start + " - " + disp.end,
            person: disp.teacher.name + " " + disp.teacher.lastName,
            title: title,
            createTime: createTime,
          };

          user.notifications.unshift(notification);
          user.notificationsCounter += 1;

          user.save();

          
          disp.reserved = false;
          disp.user = undefined;
          disp.comment = undefined;
          await disp.save();

        } catch (error) {
          next(error);
        }
      }

      return res.send("cancel classes done");
    };

    updateClasses();

  } catch (error) {
    next(error);
  }
};

const userCancelClasses = async (req, res, next) => {
  try {
    const classes = req.body.days;

    if (classes && classes.length === 0) {
      return res.send("no classes selected");
    }

    const updateClasses = async () => {
      for (const newClass of classes) {
        try {
          let disp = await Class.findById(newClass).populate("teacher user").orFail();
          let user = await User.findById(disp.teacher._id).orFail();

          const createTime = getTimeToNotification();

          const notification = {
            date: disp.date,
            time: disp.start + " - " + disp.end,
            person: disp.user.name + " " + disp.user.lastName,
            title: "Canceled lesson",
            createTime: createTime,
          }

          user.notifications.unshift(notification);
          user.notificationsCounter += 1;

          await user.save();

          disp.reserved = false;
          disp.user = undefined;
          disp.comment = undefined;

          await disp.save();
        } catch (error) {
          next(error);
        }
      }

      return res.send("cancel classes done");
    };

    updateClasses();

  } catch (error) {
    next(error);
  }
};

const getUserClasses = async (req, res, next) => {

  try {

    const { days } = req.query;

    const dispositions = [];

    const findClasses = async () => {
      for (const day of days) {
        try {
          let element = {};
          const classes = await Class.find({ date: day, user: req.user._id, reserved: true }).populate("user teacher");
          if (classes.length === 0) {
            element = {
              date: day,
              classes: []
            }
          }
          else {
            element = {
              date: day,
              classes: classes
            }
          }

          dispositions.push(element);
        } catch (error) {
          next(error);
        }
      }
    }

    await findClasses();

    return res.json(dispositions);

  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const lesson = await Class.findById(req.params.id).populate("user").orFail();

    lesson.comment = req.body.comment;

    await lesson.save();

    return res.status(201).json({
      success: "comment updated",
      lessonUpdated: {
        ...lesson
      }
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { getDispositions, getClasses, addDisposition, deleteClasses, signUpForClasses, adminCancelClasses, userCancelClasses, getUserClasses, getFreeClasses, editComment }