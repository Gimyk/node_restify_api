const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User'); // we are using this and not the general require cause it will give an error saying, the model has already been brought in

exports.authenticate = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            // get User by email
            const user = await User.findOne({ email });

            // match the password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    // pass did not match
                    reject('Authentication failed');

                }
            })

        } catch (e) {
            // email not found
            reject('Authentication failed');
        }
    })
};