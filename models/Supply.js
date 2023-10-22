const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplySchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide the supply name"],
    },

    pricePerQuantity: {
        type: Number,
        validate: {
            validator: function (v) {
                // Check mathematically for two decimal places
                return Math.round(v * 100) === v * 100;
            },
            message: (props) => `${props.value} should have exactly two decimal places!`,
        },
    },

    pricePerUnit: {
        type: Number,
        validate: {
            validator: function (v) {
                // Check mathematically for two decimal places
                return Math.round(v * 100) === v * 100;
            },
            message: (props) => `${props.value} should have exactly two decimal places!`,
        },
    },

    quantity: {
        type: Number,
        required: [true, "Please provide the quantity for the supply"],
    },

    stock: {
        type: Number,
        required: [true, "Please provide the stock for the supply"],
        min: [0, "Stock cannot be negative"],
    },
});

SupplySchema.pre("validate", function (next) {
    if (!this.pricePerQuantity && !this.pricePerUnit) {
        this.invalidate("pricePerQuantity", "Either pricePerQuantity or pricePerUnit must be provided.");
        this.invalidate("pricePerUnit", "Either pricePerQuantity or pricePerUnit must be provided.");
    } else if (this.pricePerQuantity && this.pricePerUnit) {
        this.invalidate("pricePerQuantity", "Only one of pricePerQuantity or pricePerUnit can be provided.");
        this.invalidate("pricePerUnit", "Only one of pricePerQuantity or pricePerUnit can be provided.");
    }
    next();
});

const Supply = mongoose.model("Supply", SupplySchema);

module.exports = Supply;
