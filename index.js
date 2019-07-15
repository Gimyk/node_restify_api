const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer();

const cors = corsMiddleware({
    // preflightMaxAge: 5, //Optional
    origins: ["*"],
    allowHeaders: ['API-Token', 'Access-Control-Allow-Origin'],
    exposeHeaders: ['API-Token-Expiry' /*, 'Access-Control-Allow-Origin'*/ ]
});

server.pre(cors.preflight);
server.use(cors.actual);

//Middleware
server.use(restify.plugins.bodyParser());
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
});




const db = mongoose.connection;
db.on('error', (err) => console.log('this is the error from the db', err))
db.once('open', () => {
    require('./routes/customers')(server);
    console.log(`Server Started on port ${config.PORT}`)
});