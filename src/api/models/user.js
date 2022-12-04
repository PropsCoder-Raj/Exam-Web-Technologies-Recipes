const db = require("./db");
const bcrypt = require("bcryptjs");


// constructor
const Users = function(user) {
    this.Name = user.Name;
    this.Email = user.Email;
    this.Password = user.Password;
    this.UserType = user.UserType;
};

const initUserTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Email TEXT,
    Password TEXT,
    UserType TEXT,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;

    db.run(sql, (err, res) => {
        if (err) {
          console.log("error: ", err.message);
          return;
        }
    
        getUsers();
        console.log("Created Users Table");
    });
}

const initFreeTire = async() => {
  const sql = "INSERT INTO users (Name, Email, Password, UserType) VALUES (?, ?, ?, ?)";
  db.run(sql, ['Rohit', 'rohit@gmail.com', await bcrypt.hash("Rohit@123", 10), "free"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    getUsers();
    console.log({ status: true, message: "A new free-tire user has been craeted." });
  });
}

const initPremiumTire = async() => {
  const sql = "INSERT INTO users (Name, Email, Password, UserType) VALUES (?, ?, ?, ?)";
  db.run(sql, ['Rahul', 'rahul@gmail.com', await bcrypt.hash("Rahul@123", 10), "premium"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    getUsers();
    console.log({ status: true, message: "A new premium-tire user has been craeted." });
  });
}

const initAdminTire = async() => {
  const sql = "INSERT INTO users (Name, Email, Password, UserType) VALUES (?, ?, ?, ?)";
  db.run(sql, ['Admin', 'admin@gmail.com', await bcrypt.hash("Admin@123", 10), "admin"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    getUsers();
    console.log({ status: true, message: "A new admin has been craeted." });
  });
}

const getUsers = () => {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (err, users) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    if(users.length === 0){
      initFreeTire();
      initPremiumTire();
      initAdminTire();
    }

    console.log("Users: ", users);
  });
}


const dropTable = () => {
  const sql = `DROP TABLE users`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Items: ", items);
  });
}

// dropTable();
initUserTable();

module.exports = Users;