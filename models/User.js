const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
    
})

// UserSchema.pre("save", async  () => {
//     this.password = await bcrypt.hash(this.password, 12);
//   });

const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel;