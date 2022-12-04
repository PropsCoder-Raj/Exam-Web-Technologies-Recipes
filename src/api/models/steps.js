const db = require("./db");

// constructor
const Steps = function(steps) {
    this.Step_Id = steps.Step_Id;
    this.Text = steps.Text;
    this.RecipeId = steps.RecipeId;
};

const initStepsTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS steps (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Step_Id INTEGER,
    Text TEXT,
    RecipeId INTEGER,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(RecipeId) REFERENCES recipes(Id) )`;

    db.run(sql, (err, res) => {
        if (err) {
          console.log("error: ", err.message);
          return;
        }
    
        getSteps();
        console.log("Created Steps Table");
    });
}

const getSteps = () => {
  const sql = `SELECT * FROM steps`;
  db.all(sql, [], (err, steps) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Steps: ", steps);
  });
}

const dropTable = () => {
  const sql = `DROP TABLE steps`;
  db.all(sql, [], (err, steps) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Steps: ", steps);
  });
}

// dropTable();
initStepsTable();

module.exports = Steps; 