const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Assuming you've already defined the SaleSchema and model
const SaleSchema = require("./path_to_Sale_model"); // Replace 'path_to_Sale_model' with the actual path

const FinanceSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },

    dailySale: {
        type: Number,
        default: 0,
    },

    weeklySale: {
        type: Number,
        default: 0,
    },

    monthlySale: {
        type: Number,
        default: 0,
    },

    profit: {
        type: Number,
        default: 0,
        validate: {
            validator: function (v) {
                return Math.round(v * 100) === v * 100;
            },
            message: (props) => `${props.value} should have exactly two decimal places!`,
        },
    },

    expenses: {
        type: Number,
        default: 0,
        validate: {
            validator: function (v) {
                return Math.round(v * 100) === v * 100;
            },
            message: (props) => `${props.value} should have exactly two decimal places!`,
        },
    },
});

const Finance = mongoose.model("Finance", FinanceSchema);

module.exports = Finance;
