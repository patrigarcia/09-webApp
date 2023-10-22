const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide the product name"],
    },

    price: {
        type: Number,
        required: [true, "Please provide the product price"],
        validate: {
            validator: function (v) {
                // Check mathematically for two decimal places
                return Math.round(v * 100) === v * 100;
            },
            message: (props) => `${props.value} should have exactly two decimal places!`,
        },
    },

    type: {
        type: String,
        required: [true, "Please provide the product type"],
    },

    quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
        min: [0, "Quantity cannot be negative"],
    },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
