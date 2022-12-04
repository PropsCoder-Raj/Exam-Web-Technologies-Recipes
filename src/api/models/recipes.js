const db = require("./db");

// constructor
const Recipes = function(recipes) {
    this.Name = recipes.Name;
    this.Category = recipes.Category;
};

Recipes.create = async (newRecipes, result) => {
  const sql = `INSERT INTO recipes (Name, Category) VALUES (?, ?)`;
  db.run(sql, [newRecipes.Name, newRecipes.Category], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    const sqlNew = `SELECT * from recipes order by Id DESC limit 1`;
    db.get(sqlNew, [], (err, resNew) => {

      getRecipes();
      result(null, { status: true, message: "A new recipes has been craeted.", data: resNew });
    })
  });
};

const initRecipesTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS recipes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Category TEXT,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;

    db.run(sql, (err, res) => {
        if (err) {
          console.log("error: ", err.message);
          return;
        }
    
        getRecipes();
        console.log("Created Recipes Table");
    });
}

const getRecipes = () => {
  const sql = `SELECT * FROM recipes`;
  db.all(sql, [], (err, recipes) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Recipes: ", recipes);
  });
}

const dropTable = () => {
  const sql = `DROP TABLE recipes`;
  db.all(sql, [], (err, recipes) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Recipes: ", recipes);
  });
}

// dropTable();
initRecipesTable();

module.exports = Recipes; 