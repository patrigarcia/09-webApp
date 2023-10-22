require("dotenv").config();

const User = require("./path_to_User_model"); // Reemplaza 'path_to_User_model' con la ruta real a tu modelo de usuario
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {
    async register(req, res) {
        try {
            const userExists = await User.findOne({ email: req.body.email });
            if (userExists) {
                return res.status(400).send("Email already exists");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            const savedUser = await user.save();

            res.send({ user: savedUser._id });
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send("Email is not found");
            }

            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).send("Invalid password");
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.header("auth-token", token).send(token);
        } catch (err) {
            res.status(400).send(err);
        }
    },
};

module.exports = UserController;
