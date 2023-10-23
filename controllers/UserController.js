require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {
    async register(req, res) {
        try {
            const userExists = await User.findOne({ email: req.body.email });
            if (userExists) {
                return res.status(400).send("Este e-mail ya existe");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            const savedUser = await user.save();

            res.status(200).send(`Te has dado de alta con éxito ${user.name}`);
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });

            if (!user) {
                return res.status(404).json({ message: "Usuario o contraseña incorrecto!" });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            if (user.token.length > 4) user.token.shift();
            user.token.push(token);

            await user.save();

            res.send({ message: `Bienvenid@ ${user.name}`, token });
        } catch (error) {
            console.error(error);
        }
    },

    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { token: req.headers.authorization },
            });

            res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);

            res.status(500).send({
                message: "Hubo un problema al intentar desconectar al usuario",
            });
        }
    },
};

module.exports = UserController;
