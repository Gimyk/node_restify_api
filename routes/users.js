const errors = require('restify-errors');
const User = require('../models/User');
const bcyrpt = require('bcryptjs');
const auth = require('../auth');
const jwt = require("jsonwebtoken");
const config = require('../config');


module.exports = server => {
    //register user
    server.post('/register', async(req, res, next) => {

        const { email, password } = req.body;

        const user = new User({
            email,
            password
        });

        bcyrpt.genSalt(10, (err, salt) => {
            bcyrpt.hash(user.password, salt, async(err, hash) => {
                // hash password
                user.password = hash;
                // save the user
                try {
                    const newUSer = await user.save();
                    res.send(201);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message));

                }
            });
        });
    });

    server.post('/auth', async(req, res, next) => {
        const { email, password } = req.body;

        try {
            // Auth user
            const user = await auth.authenticate(email, password);
            // console.log('it is working from here => the user is --->', user);
            // console.log('the user in Json format --->', user.toJSON());
            // create jwt
            const token = jwt.sign(user.toJSON(), config.JWT_SECRETE, {
                expiresIn: '20m'
            });

            // iat = issued at
            const { iat, exp } = jwt.decode(token);
            // console.log('this is the ait --->', iat);
            // console.log('this is the exp --->', exp);
            // console.log('this is the jwt --->', token);

            res.send({ iat, exp, token });

            next();
        } catch (e) {
            // user unauthorised
            return next(new errors.UnauthorizedError(e));
        }

    })
};