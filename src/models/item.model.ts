import { Item } from "../types";
import mongoose, { Document, Schema } from "mongoose";

export interface ItemDocument extends Omit<Item, 'id'>, Document {
    _id: string;
 }

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String
}, {
    timestamps: true,
    versionKey: false
})


export const ItemModel = mongoose.model<ItemDocument>('Item', ItemSchema)