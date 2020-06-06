# Rest API with Node Restify and JWT

Install dependensices
>npm i

or install them individually
> npm i restify restify-errors mongoose mongoose-timestamp 

for watching the server so you dont have to  keep watching for changes and the -D is for devDependensies
>npm i -D nodemon 


<!-- Added this two in package.js under scripts -->
"start": "node index.js",
"dev": "nodemon index.js"



* the routes folder has a route files for all the routes routes needed
* the models folder has the models for all the routes since mongo required models for CRUD