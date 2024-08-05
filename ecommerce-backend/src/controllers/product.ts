import { Response, Request } from "express";
import fs from 'fs';
import path from 'path';
import ProductModel from "../models/product"

// Path to your JSON file
const filePath = path.resolve(__dirname, './FakeProduct.json');

export const getProducts = async (req: Request, res: Response) => {
    const { page = 1, search } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;

        const searchQuery = search
            ? { name: { $regex: search as string, $options: 'i' } }
            : {};

        const total = await ProductModel.countDocuments({});
        const product = await ProductModel.find(searchQuery).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: product, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

// Function to map and save products
export const importProducts = async (req: Request, res: Response) => {
    try {

        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');

        // Parse the JSON data
        const productData = JSON.parse(data);
        // Assuming `productData` is the imported JSON data
        const products = productData.map((item: any) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            image: item.image
        }));

        // Insert the products into the database
        await ProductModel.insertMany(products);

        res.status(201).send({ message: 'Products imported successfully!' });
    } catch (error) {
        console.error('Error importing products:', error);
        res.status(500).send({ message: 'Error importing products' });
    }
};
