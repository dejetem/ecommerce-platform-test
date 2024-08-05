import { model, Schema, Document } from "mongoose";

import { Product } from "../interfaces/product.model";


const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false,
        },

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: function (doc: any, ret: any) {
                delete ret._id;
            },
        },
    }
);

export default model<Product & Document>("Product", productSchema);