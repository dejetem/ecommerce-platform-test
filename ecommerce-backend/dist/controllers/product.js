"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProducts = exports.getProduct = exports.getProducts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const product_1 = __importDefault(require("../models/product"));
// Path to your JSON file
const filePath = path_1.default.resolve(__dirname, './FakeProduct.json');
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, search } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const searchQuery = search
            ? { name: { $regex: search, $options: 'i' } }
            : {};
        const total = yield product_1.default.countDocuments({});
        const product = yield product_1.default.find(searchQuery).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: product, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProduct = getProduct;
// Function to map and save products
const importProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Read the JSON file
        const data = fs_1.default.readFileSync(filePath, 'utf8');
        // Parse the JSON data
        const productData = JSON.parse(data);
        // Assuming `productData` is the imported JSON data
        const products = productData.map((item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            image: item.image
        }));
        // Insert the products into the database
        yield product_1.default.insertMany(products);
        res.status(201).send({ message: 'Products imported successfully!' });
    }
    catch (error) {
        console.error('Error importing products:', error);
        res.status(500).send({ message: 'Error importing products' });
    }
});
exports.importProducts = importProducts;
//# sourceMappingURL=product.js.map