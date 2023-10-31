const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');


const app = express();

const httpServer = createServer(app);
global.io = new Server(httpServer);

app.use(express.json());
app.use(cookieParser());

const teachers = [];
const students = [];

// io.on("connection", (socket) => {
//   socket.on("teacher connected with server", (teacherName) => {
//     teachers.push({id: socket.id, teacher: teacherName});
//   });

//   socket.on("student connected with server", (studentName) => {
//     students.push({ id: socket.id, student: studentName});
//   });

//   // socket.on("student generate notification", (teacherID) => {

//   //   const teacherExists = teachers.find((x) => x.teacher === `Teacher${teacherID}`);

//   //   if(teacherExists){
//   //     socket.broadcast.to(teacherExists.id).emit("reload redux", ""); 
//   //   }

//   // });


// });

app.get('/', (req, res, next) => {
  res.json({ message: "API running..."})
});

connectDB();

app.use('/api', apiRoutes);

const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")));
} else {
   app.get("/", (req,res) => {
      res.json({ message: "API running..." }); 
   }) 
}

app.use((error, req, res, next) => {
  if(process.env.NODE_ENV === "development"){
    console.error(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if(process.env.NODE_ENV === "development"){
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
  else{
    res.status(500).json({
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });