const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
    server.get('/customers', async(req, res, next) => {
        try {
            const customers = await Customer.find({});
            res.send(customers);
        } catch (e) {
            return next(new errors.InvalidContentError(e));
            // this is going to use the restify errors to print out the specified error
            // https://github.com/restify/errors check them out

        }

        next(); //you have to do this with restify
    });

    server.post('/customers', async(req, res, next) => {
        // check for json
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        console.log("posting data");
        const { name, email, balance, empType, notes } = req.body;

        const customer = new Customer({
            name,
            email,
            balance,
            empType,
            notes
        });
        console.log("Loaded model");

        try {
            const newCustomer = await customer.save();
            console.log("--done posting data--");

            res.send(201);
            next();
        } catch (err) {
            return next(errors.InternalError(err.message));
        }
    });

    server.post('/search', async(req, res, next) => {

        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const arr = Object.keys(req.body).map((key) => [key, req.body[key]]);
        const key = String(arr[0][0]); // this will be implemented to allow search according to feild
        const value = arr[0][1];
        console.log(key);
        console.log(value);
        try {
            // db.posts.find({tags:{$regex:"tutorial"}})
            // const searchCust = await Customer.find(req.body)
            const searchCust = await Customer.find({ name: { $regex: '.*' + value + '.*', $options: 'i' } })
            console.log("--searching--");
            res.send(searchCust);
            next();
        } catch (err) {
            return next(errors.InternalError('My error ', err.message));
        }

    });

    server.get('/customers/:id', async(req, res, next) => {
        try {
            const customers = await Customer.findById(req.params.id);
            res.send(customers);
        } catch (e) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
        next(); //you have to do this with restify
    });



    server.put('/customers/:id', async(req, res, next) => {
        // check for json
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const cust = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    // del because restify
    server.del('/customers/:id', async(req, res, next) => {
        try {
            const cust = await Customer.findOneAndRemove({ _id: req.params.id });
            res.send(204);
            next();
        } catch (e) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });
};