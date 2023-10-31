const ObjectId = require('mongodb').ObjectId;

const classes = Array.from({ length: 6}).map((_, idx) => {

  const currentDay = new Date();
  currentDay.setDate(currentDay.getDate() + idx);

  return {
    _id: ObjectId("64a99a6645b2417dba01821" + idx),
    date: currentDay.toISOString().substring(0, 10),
    start: "17:00",
    end: "18:00",
    user: ObjectId("64a99a6645b2417dba018214"),
    reserved: true,
    comment: "default comment",
    teacher: ObjectId("64a99a6645b2417dba011234")
  }
});

// const classes = [
//   {
//     _id: ObjectId("64a99a6645b2417dba018212"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "17:00",
//     end: "18:00",
//     user: ObjectId("64a99a6645b2417dba018214"),
//     reserved: true
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018213"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "18:00",
//     end: "19:00",
//     user: ObjectId("64a99a6645b2417dba018215"),
//     reserved: true
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018315"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "17:00",
//     end: "18:00",
//     user: ObjectId("64a99a6645b2417dba018214"),
//     reserved: true
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018312"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "18:00",
//     end: "19:00",
//     user: ObjectId("64a99a6645b2417dba018215"),
//     reserved: true
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018313"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "17:00",
//     end: "18:00",
//     user: ObjectId("64a99a6645b2417dba018214"),
//     reserved: true
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018314"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "18:00",
//     end: "19:00",
//     user: ObjectId("64a99a6645b2417dba018215"),
//     reserved: true
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018201"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "19:00",
//     end: "20:00",
//   },
//   {
//     _id: ObjectId("64a99a6645b2417dba018202"),
//     date: new Date().toISOString().substring(0, 10),
//     start: "20:00",
//     end: "21:00",
//   }
// ];

module.exports = classes;