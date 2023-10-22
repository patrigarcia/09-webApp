const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Assuming you've already defined the ProductSchema and model
const ProductSchema = require("./path_to_Product_model"); // Replace 'path_to_Product_model' with the actual path

const SaleSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide the product sold"],
    },

    quantity: {
        type: Number,
        required: [true, "Please provide the quantity sold"],
        min: [1, "Quantity should be at least 1"],
    },

    total: {
        type: Number,
        required: [true, "Please provide the total sale amount"],
        validate: {
            validator: function (v) {
                // Check mathematically for two decimal places
                return Math.round(v * 100) === v * 100;
            },
            message: (props) => `${props.value} should have exactly two decimal places!`,
        },
    },

    saleDate: {
        type: Date,
        default: Date.now,
    },
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
