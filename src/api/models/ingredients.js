const db = require("./db");

// constructor
const Ingredients = function(ingredients) {
    this.Entry = ingredients.Entry;
    this.Type = ingredients.Type;
    this.RecipeId = ingredients.RecipeId;
};


Ingredients.craeteMulti = async(ingredientsArray, id, result) => {
  const sql = "INSERT INTO ingredients (Entry, Type, RecipeId) VALUES (?, ?, ?)";
  const stmt  = db.prepare(sql);
  var bar = new Promise((resolve, reject) => {
    ingredientsArray.forEach(async(ele, index, array) => {
      stmt.run([ele.entry, ele.type, id]);

      if(index === array.length - 1) resolve()
    })
  })

  bar.then(async() => {
    await stmt.finalize();
    getIngredients();

    result(null, { status: true, message: "Create Multiple Ingredients." });
  })
}

Ingredients.deleteByRecipeId = async (Id, result) => {
  const sql = `DELETE from ingredients WHERE RecipeId = (?)`;
  db.run(sql, Id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: err, message: err });
      return;
    }
    
    result(null, { status: true, message: `Ingredients - ${Id}. Ingredients was deleted successfully!` });
  });
};

Ingredients.findByRecipesId = (recipesId, result) => {
  const sql = `SELECT * FROM ingredients WHERE RecipeId = ${recipesId}`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (items.length > 0) {
      result(null, { status: true, message: "Get ingredients with RecipeId id "+recipesId, data: items, count: items.length });
      return;
    }

    // not found Items with the recipesNo
    result({ kind: "not_found" }, null);
  });
};

Ingredients.findByType = (type, result) => {
  const sql = `SELECT * FROM ingredients WHERE Type LIKE "%${type}%"`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (items.length > 0) {
      result(null, { status: true, message: "Search ingredients with ingredients type "+type, data: items, count: items.length });
      return;
    }

    // not found Items with the recipesNo
    result({ kind: "not_found" }, null);
  });
};

Ingredients.findByRecipesIdTypeAndUpdate = (recipesId, ingredients, result) => {
  var sql = ``;
  
  if(ingredients !== undefined && ingredients.length !== 0){
    ingredients.forEach((ele) => {
      sql = `UPDATE ingredients SET Entry='${ele.entry}' WHERE RecipeId = ${recipesId} AND Type = '${ele.type}'`;
      db.run(sql, [], (err, items) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
    })
  }
  
  result(null, { status: true, message: "Update ingredients with recipes id and type "+recipesId });
  return;
};


const initIngredientsTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS ingredients (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Entry TEXT,
    Type TEXT,
    RecipeId INTEGER,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(RecipeId) REFERENCES recipes(Id) )`;

    db.run(sql, (err, res) => {
        if (err) {
          console.log("error: ", err.message);
          return;
        }
    
        getIngredients();
        console.log("Created Ingredients Table");
    });
}

const getIngredients = () => {
  const sql = `SELECT * FROM ingredients`;
  db.all(sql, [], (err, ingredients) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Ingredients: ", ingredients.length);
  });
}

const dropTable = () => {
  const sql = `DROP TABLE ingredients`;
  db.all(sql, [], (err, ingredients) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Ingredients: ", ingredients);
  });
}

// dropTable();
initIngredientsTable();

module.exports = Ingredients; 