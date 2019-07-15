# Rest API with Node Restify and JWT

-y for no questions asked
>npm init -y

> npm i restify restify-errors mongoose mongoose-timestamp 

all of these are the dependensies needed.
>npm i -D nodemon 

for watching the server so you dont have to  keep watching for changes and the -D is for devDependensies

<!-- Added this two in package.js under scripts -->
"start": "node index.js",
"dev": "nodemon index.js"

---

* Now what is happening is, the config will just set some environment variables and nothing much

* index.js will set the connection to the required database and start the server and also specifying the routes that will be used in the API

---

* the routes folder has a route files for all the routes routes we need
* the models folder has the models for all the routes since mongo required models for CRUD