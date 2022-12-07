# Webtech Exam

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
  Create the `.env` file & below code popy & paste in the file.
  ```
  JWT_SECRET=Recipes
  JWT_EXPIRY=3600
  PORT=5000
  ```

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

    $ npm install

## Run the Project

    $ npm run start

Then the server start on 
```
localhost:5000/
```


## API Documentation

### POST /login
This api use for login all roles Admin, Premium & Free Users.<br>

<b>Request body :</b>
```
{
    "email": "admin@gmail.com",
    "password": "Admin@123"
}

```

<b>Response :</b>
```
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c",
    "user": {
        "Id": 3,
        "Name": "Admin",
        "Email": "admin@gmail.com",
        "UserType": "admin",
        "CreatedAt": "2022-12-04 17:07:37",
        "UpdatedAt": "2022-12-04 17:07:37"
    },
    "options": {
        "expires": "2022-12-08T04:39:47.385Z",
        "httpOnly": true
    }
}
```
---

### GET /recipe
Get All free recipes using token `(Access admin, free, premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}

```

<b>Response :</b>
```
{
    "success": true,
    "message": "Successfully get the free recipes",
    "data": [
        {
            "Id": 3,
            "Name": "Easy Pancakes",
            "Category": "free",
            "CreatedAt": "2022-12-06 17:03:41",
            "UpdatedAt": "2022-12-06 17:03:41"
        }
    ]
}
```
---

### GET /recipe/3
Get step overview by recipes id using token `(Access admin, free, premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}

```

<b>Response :</b>
```
{
    "success": true,
    "message": "Successfully Get steps overview the recipes with id 3",
    "data": {
        "name": "Easy Pancakes",
        "ingredients": [
            {
                "Id": 9,
                "Entry": "100g plain flour",
                "Type": "flour",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 10,
                "Entry": "2 large eggs",
                "Type": "egg",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 11,
                "Entry": "300ml milk",
                "Type": "milk",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 12,
                "Entry": "1 tbsp sunflower oil",
                "Type": "sunflour oil",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            }
        ],
        "step_count": 5
    }
}
```
---


### GET /recipe/3/all
Get details stpes using token `(Access admin, free, premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Response :</b>
```
{
    "success": true,
    "message": "Successfully Get steps overview the recipes with id 3",
    "data": {
        "name": "Easy Pancakes",
        "ingredients": [
            {
                "Id": 9,
                "Entry": "100g plain flour",
                "Type": "flour",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 10,
                "Entry": "2 large eggs",
                "Type": "egg",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 11,
                "Entry": "300ml milk",
                "Type": "milk",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 12,
                "Entry": "1 tbsp sunflower oil",
                "Type": "sunflour oil",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            }
        ],
        "steps": [
            {
                "Id": 11,
                "Step_Id": 1,
                "Text": "Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl large",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 12,
                "Step_Id": 2,
                "Text": "Set aside for 30 mins to rest if you have time, or start cooking straight away.",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 13,
                "Step_Id": 3,
                "Text": "Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper.",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 14,
                "Step_Id": 4,
                "Text": "When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            },
            {
                "Id": 15,
                "Step_Id": 5,
                "Text": "Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking",
                "RecipeId": 3,
                "CreatedAt": "2022-12-06 17:03:41",
                "UpdatedAt": "2022-12-06 17:03:41"
            }
        ]
    }
}
```
---

### GET /recipe/3/2
Get single step by recipes id & step id using token `(Access admin, free, premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Response :</b>

```
{
    "success": true,
    "message": "Successfully Get single set the recipes with recipe id 3 and step id 2",
    "data": [
        {
            "Id": 12,
            "Step_Id": 2,
            "Text": "Set aside for 30 mins to rest if you have time, or start cooking straight away.",
            "RecipeId": 3,
            "CreatedAt": "2022-12-06 17:03:41",
            "UpdatedAt": "2022-12-06 17:03:41"
        }
    ]
}
```
---


### GET /recipe-premium
Get All premium recipes using token `(Access premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Response :</b>

```
{
    "success": true,
    "message": "Successfully get the premium recipes",
    "data": [
        {
            "Id": 4,
            "Name": "Easy-Chocolate Pancakes",
            "Category": "premium",
            "CreatedAt": "2022-12-07 00:20:32",
            "UpdatedAt": "2022-12-07 00:20:32"
        }
    ]
}
```
---


### GET /search/eg
Search Ingredents using token `(Access premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Response :</b>

```
{
    "success": true,
    "message": "Successfully search by the ingredient name eg",
    "search": "eg",
    "data": [
        "/recipe/3",
        "/recipe/4"
    ]
}
```
---



### GET /ingredients/o
Search Ingredents list all info using token `(Access premium)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Response :</b>

```
{
    "success": true,
    "message": "Successfully search by the ingredient name o",
    "search": "o",
    "data": [
        {
            "Id": 9,
            "Entry": "100g plain flour",
            "Type": "flour",
            "RecipeId": 3,
            "CreatedAt": "2022-12-06 17:03:41",
            "UpdatedAt": "2022-12-06 17:03:41"
        },
        {
            "Id": 12,
            "Entry": "1 tbsp sunflower oil",
            "Type": "sunflour oil",
            "RecipeId": 3,
            "CreatedAt": "2022-12-06 17:03:41",
            "UpdatedAt": "2022-12-06 17:03:41"
        },
        {
            "Id": 13,
            "Entry": "50g plain flour",
            "Type": "flour",
            "RecipeId": 4,
            "CreatedAt": "2022-12-07 00:20:32",
            "UpdatedAt": "2022-12-07 00:20:32"
        },
        {
            "Id": 16,
            "Entry": "1 tbsp sunflower oil",
            "Type": "sunflour oil",
            "RecipeId": 4,
            "CreatedAt": "2022-12-07 00:20:32",
            "UpdatedAt": "2022-12-07 00:20:32"
        },
        {
            "Id": 17,
            "Entry": "50 gram chocolate",
            "Type": "chocolate",
            "RecipeId": 4,
            "CreatedAt": "2022-12-07 00:20:32",
            "UpdatedAt": "2022-12-07 00:20:32"
        }
    ]
}
```
---



### POST /recipe
Create Recipes using token `(Access admin)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Request body :</b>
```
{
    "name": "Easy chocolate Pancakes",
    "category": "premium",
    "ingredients": [
        {
            "entry": "100g plain flour",
            "type": "flour"
        },
        {
            "entry": "2 large eggs",
            "type": "egg"
        },
        {
            "entry": "300ml milk",
            "type": "milk"
        },
        {
            "entry": "1 tbsp sunflower oil",
            "type": "sunflour oil"
        },
        {
            "entry": "50 gram chocolate",
            "type": "chocolate"
        }
    ],
    "steps": [
        {
            "step_id": 1,
            "text":"Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl large"
        },
        {
            "step_id": 2,
            "text":"And also mixeture of chocolate."
        },
        {
            "step_id": 3,
            "text": "Set aside for 30 mins to rest if you have time, or start cooking straight away."
        },
        {
            "step_id": 4,
            "text": "Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper."
        },
        {
            "step_id": 5,
            "text": "When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go."
        },
        {
            "step_id": 6,
            "text":"Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking"
        }
    ]
}
```

<b>Response :</b>

```
{
    "success": true,
    "message": "Successfully created the recipes"
}
```
---


### PATCH /recipe/4
Update Recipes using token `(Access admin)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Request body :</b>
```
{
    "name": "Easy-Chocolate Pancakes",
    "category": "premium",
    "ingredients": [
        {
            "entry": "50g plain flour",
            "type": "flour"
        }
    ],
    "steps": [
        {
            "step_id": 1,
            "text":"Put & 50g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl large"
        }
    ]
}
```

<b>Response :</b>

```
{
    "status": true,
    "message": "Update recipes with recipes id 4"
}
```
---


### PUT /recipe/4
Replace Recipes using token `(Access admin)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Request body :</b>
```
{
    "name": "Easy chocolate Pancakes",
    "category": "premium",
    "ingredients": [
        {
            "entry": "100g plain flour",
            "type": "flour"
        },
        {
            "entry": "2 large eggs",
            "type": "egg"
        },
        {
            "entry": "300ml milk",
            "type": "milk"
        },
        {
            "entry": "1 tbsp sunflower oil",
            "type": "sunflour oil"
        },
        {
            "entry": "50 gram chocolate",
            "type": "chocolate"
        }
    ],
    "steps": [
        {
            "step_id": 1,
            "text":"Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl large"
        },
        {
            "step_id": 2,
            "text":"And also mixeture of chocolate."
        },
        {
            "step_id": 3,
            "text": "Set aside for 30 mins to rest if you have time, or start cooking straight away."
        },
        {
            "step_id": 4,
            "text": "Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper."
        },
        {
            "step_id": 5,
            "text": "When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go."
        },
        {
            "step_id": 6,
            "text":"Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking"
        }
    ]
}
```

<b>Response :</b>

```
{
    "status": true,
    "message": "Replace recipes with recipes id 4"
}
```
---




### DELETE /recipe/6
Delete Recipes using token `(Access admin)`.<br>

<b>Request Header :</b>
```
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcwMzg3OTg3LCJleHAiOjE2NzAzOTE1ODd9.R8VvxN9CUZpo_XJKz6pnEPH3OVIrW0kDwe6MJqD9k5c"
}
```

<b>Response :</b>

```
{
    "success": true,
    "message": "Successfully Deleted the recipes with id 6"
}
```
---


