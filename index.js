const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware');
const rjwt = require('restify-jwt-community');


const server = restify.createServer();

// this Middleware will get rid of CORS errors in the browser
const cors = corsMiddleware({
    // preflightMaxAge: 5, //Optional
    origins: ["*"],
    allowHeaders: ['API-Token', 'Access-Control-Allow-Origin'],
    exposeHeaders: ['API-Token-Expiry' /*, 'Access-Control-Allow-Origin'*/ ]
});
// end cors

server.pre(cors.preflight);
server.use(cors.actual);

//Middleware
server.use(restify.plugins.bodyParser());
//protect routes
server.use(rjwt({ secret: config.JWT_SECRETE }).unless({ path: ['/auth'] }));

mongoose.set('useFindAndMOdify', false); // this will get rid of mongo warnings
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
});




const db = mongoose.connection;
db.on('error', (err) => console.log('this is the error from the db', err))
db.once('open', () => {
    require('./routes/customers')(server);
    require('./routes/users')(server);
    console.log(`Server Started on port ${config.PORT}`);
    console.log(`Mongoose connected`);
});