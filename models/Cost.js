const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplySchema = require("./models/Supply.js");

const CostSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Please provide the product name"],
    },

    ingredients: [
        {
            supply: {
                type: Schema.Types.ObjectId,
                ref: "Supply",
                required: true,
            },
            quantityUsed: {
                type: Number,
                required: [true, "Please provide the quantity of the ingredient used"],
                min: [0, "Quantity used cannot be negative"],
            },
        },
    ],
});

const Cost = mongoose.model("Cost", CostSchema);

module.exports = Cost;
