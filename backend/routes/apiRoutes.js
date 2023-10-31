const express = require('express');
const userRoutes = require('./userRoutes');
const classRoutes = require('./classRoutes');
const jwt = require("jsonwebtoken");

const app = express();

app.get('/logout', (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

app.get('/get-token', (req, res) => {
  try{
    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    return res.json({
      token: decoded.name,
      isAdmin: decoded.isAdmin
    });
  }catch(error){
    return res.status(401).send("Unauthorized. Invalid token");
  }
});

app.use('/users', userRoutes);
app.use('/classes', classRoutes);

module.exports = app;