const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Primary ID
    address: {
        type: String,
        required: true,
        unique: true /* , minlength: 64, maxlength: 64 */,
    }, // 64-character hex string
})

const User = mongoose.model("User", userSchema)

module.exports = User
