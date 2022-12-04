const db = require("../models/db");

// constructor
const Users = function(user) {
    this.Name = user.Name;
    this.Email = user.Email;
    this.Password = user.Password;
    this.UserType = user.UserType;
};

Users.getUserUsingEmail = async(email, result) => {
    const sql = `SELECT * FROM users WHERE Email = "${email}"`;
    db.all(sql, [], (err, users) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }

      result(null, users);
    })
}

module.exports = Users;