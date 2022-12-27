const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true, minLength: 5},
    token: {type: String},
    username: {type: String, require: true, unique: true},
    notifToken: {type: String, default: null}
});

userSchema.pre('save', function(next) {
    var user = this
    console.log("This is where pre save runs")
    console.log(user)
    
    if(user.isModified("password")){
        bcrypt.genSalt(10, function(err,salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password, salt,function(err,hash){
                if(err){
                    return next(err)
                }
                user.password = hash;
                console.log(user.password)
                next();
            })
        })
    }else{
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch);
    })
}
module.exports = mongoose.model('User', userSchema);