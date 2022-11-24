const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/p_t_1")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;