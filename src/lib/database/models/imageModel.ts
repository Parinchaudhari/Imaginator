import { Document } from "mongoose";
import { Schema, model, models } from "mongoose";

export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string; // Assuming URL type should be string for compatibility with MongoDB
    width?: number;
    height?: number;
    congif?: object; // Object type
    transformationURL?: string; // Assuming URL type should be string for compatibility with MongoDB
    aspectRation?: string;
    color?: string;
    promt?: string;
    author: {
        _id:string,
        firstName:string,
        lastName:string
    }; // ObjectId type from mongoose
    createdAt: Date;
    updatedAt: Date;
}


const ImageSchema= new Schema({
    title:{type:String,required:true},
    transformationType:{type:String,required:true},
    publicId:{type:String,required:true},
    secureURL:{type:String,required:true},
    width:{type:Number},
    height:{type:Number},
    congif:{type:Object},
    transformationURL:{type:String},
    aspectRation:{type:String},
    color:{type:String},
    promt:{type:String},
    author:{type:Schema.Types.ObjectId, ref:'User'},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

const Image=models?.Image || model('Image',ImageSchema)

export default Image