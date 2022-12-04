const db = require("./db");
const bcrypt = require("bcryptjs");

const initUserArray = [
  { name: 'Rohit', email: 'rohit@gmail.com', password: "Rohit@123", userType: 'free'},
  { name: 'Rahul', email: 'rahul@gmail.com', password: "Rahul@123", userType: 'premium'},
  { name: 'Admin', email: 'admin@gmail.com', password: "Admin@123", userType: 'admin'},
]

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

    if (users.length > 0) {
      result(null, users);
      return;
    }

    result({ kind: "not_found" }, null);
  })
}


Users.getUserUsingId = async(Id, result) => {
  const sql = `SELECT * FROM users WHERE Id = "${Id}"`;
  db.all(sql, [], (err, users) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }

    if (users.length > 0) {
      result(null, users);
      return;
    }

    result({ kind: "not_found" }, null);
  })
}




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

const initUserList = async() => {
  const sql = "INSERT INTO users (Name, Email, Password, UserType) VALUES (?, ?, ?, ?)";
  const stmt  = db.prepare(sql);
  var bar = new Promise((resolve, reject) => {
    initUserArray.forEach(async(ele, index, array) => {
      stmt.run([ele.name, ele.email, await bcrypt.hash(ele.password, 10), ele.userType]);

      if(index === array.length - 1) resolve()
    })
  })

  bar.then(async() => {
    await stmt.finalize();
    getUsers();
  })
}

const getUsers = () => {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (err, users) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    if(users.length === 0){
      initUserList();
    }

    console.log("Users: ", users.length);
  });
}

const dropTable = () => {
  const sql = `DROP TABLE users`;
  db.all(sql, [], (err, users) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Users: ", users);
  });
}

// dropTable();
initUserTable();

module.exports = Users; 