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


Recipes.findById = (recipesNo, result) => {
  const sql = `SELECT * FROM recipes WHERE Id = ${recipesNo}`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (items.length > 0) {
      result(null, { status: true, message: "Get items with recipes id "+recipesNo, data: items, count: items.length });
      return;
    }

    // not found Items with the recipesNo
    result({ kind: "not_found" }, null);
  });
};

Recipes.deleteById = async (Id, result) => {
  const sql = `DELETE from recipes WHERE Id = (?)`;
  db.run(sql, Id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: err, message: err });
      return;
    }
    
    result(null, { status: true, message: `Recipes - ${Id}. Recipe was deleted successfully!` });
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

    console.log("Recipes: ", recipes.length);
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