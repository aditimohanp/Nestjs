import * as mongoose from 'mongoose';
import { Product } from 'src/products/products.model';


export const AuthorsSchema = new mongoose.Schema({

        name: {type : String, required : true },
        bio : {type : String, required : true },
       products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],//add product field

});
export interface Author extends mongoose.Document {
        
        id:string;
        name:string;
        bio: string;      
        products: Product['_id'][];//add filed
        
}
AuthorsSchema.virtual('authorproducts', {//add fuction
        ref: 'Product',
        localField: '_id',
        foreignField: 'author',
      });
      
      export const AuthorModel = mongoose.model<Author>('Author', AuthorsSchema);//add field
