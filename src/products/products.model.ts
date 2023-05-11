import * as mongoose from 'mongoose';
import { Author } from '../authors/authors.model';

export const ProductSchema = new mongoose.Schema({

        title: {type : String, required : true },
        description : {type : String, required : true },
        price : {type : Number, required : true },
        author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }], // add author property

});

export interface Product extends mongoose.Document {
        id:string;
        title:string;
        description: string;
        price:number; 
        author: Author['_id']; // add author property  
       
}
ProductSchema.virtual('authorInfo', {// add a path for product to refer the author
        ref: 'Author',
        localField: 'author',
        foreignField: '_id',
        justOne: true,
      }); 
      
export const ProductModel = mongoose.model<Product>('Product', ProductSchema);  //added
