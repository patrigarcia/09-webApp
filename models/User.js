const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor rellena tu nombre"],
    },

    email: {
        type: String,
        required: [true, "Por favor rellena tu email"],
    },

    password: {
        type: String,
        required: [true, "Por favor rellena tu contraseña"],
    },

    tokens: [],

    avatar: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
