const db = require("./db");

// constructor
const Steps = function(steps) {
    this.Step_Id = steps.Step_Id;
    this.Text = steps.Text;
    this.RecipeId = steps.RecipeId;
};

Steps.craeteMulti = async(stepsArray, id, result) => {
  const sql = "INSERT INTO steps (Step_Id, Text, RecipeId) VALUES (?, ?, ?)";
  const stmt  = db.prepare(sql);
  var bar = new Promise((resolve, reject) => {
    stepsArray.forEach(async(ele, index, array) => {
      stmt.run([ele.step_id, ele.text, id]);

      if(index === array.length - 1) resolve()
    })
  })

  bar.then(async() => {
    await stmt.finalize();
    getSteps();
    
    result(null, { status: true, message: "Create Multiple Steps." });
  })
}

Steps.deleteByRecipeId = async (Id, result) => {
  const sql = `DELETE from steps WHERE RecipeId = (?)`;
  db.run(sql, Id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: err, message: err });
      return;
    }
    
    result(null, { status: true, message: `Steps - ${Id}. Steps was deleted successfully!` });
  });
};

Steps.findByRecipesId = (recipesId, result) => {
  const sql = `SELECT * FROM steps WHERE RecipeId = ${recipesId}`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (items.length > 0) {
      result(null, { status: true, message: "Get steps with recipes id "+recipesId, data: items, count: items.length });
      return;
    }

    // not found Items with the recipesNo
    result({ kind: "not_found" }, null);
  });
};

Steps.findByRecipesIdTypeAndUpdate = (recipesId, steps, result) => {
  var sql = ``;
  if(steps !== undefined && steps.length !== 0){
    steps.forEach((ele) => {
      sql = `UPDATE Steps SET Text='${ele.text}' WHERE RecipeId = ${recipesId} AND Step_Id = ${ele.step_id}`;
      db.run(sql, [], (err, items) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
    })
  }
  
  result(null, { status: true, message: "Update Steps with recipes id and type "+recipesId });
  return;
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

    console.log("Steps: ", steps.length);
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