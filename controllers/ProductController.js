const Product = require("../models/Product");

const ProductController = {
    // Create a new product
    async create(req, res) {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send({ message: "Error creating product", error });
        }
    },

    // Get all products
    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ message: "Error fetching products", error });
        }
    },

    // Get a single product by name
    async getByName(req, res) {
        try {
            const product = await Product.findOne({ name: req.params.name });
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.status(200).send(product);
        } catch (error) {
            res.status(500).send({ message: "Error fetching product", error });
        }
    },

    // Update a product by name
    async updateByName(req, res) {
        try {
            const product = await Product.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send({ message: "Error updating product", error });
        }
    },

    // Delete a product by ID
    async delete(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.status(200).send({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: "Error deleting product", error });
        }
    },
};

module.exports = ProductController;
