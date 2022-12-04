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