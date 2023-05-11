import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import { Product } from "./products.model";
import { Author } from 'src/authors/authors.model';
import { Query } from 'express-serve-static-core';


@Injectable()
export class ProductsService{
   private products: Product[] = [];
  
   constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Author') private readonly authorModel: Model<Author>, //add the model to import properties
    ) {}

    async insertProduct( title:string, desc:string, price:number,  authorId: string,) {
      const author = await this.authorModel.findById(authorId); //added
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      const prodId = Math.random().toString();
      const newProduct = new this.productModel({ title, description: desc, price, author, });
      const result = await newProduct.save();
      author.products.push(newProduct);
      await author.save(); //save the author every time the product is added
        return result.id as string;
    }

    async getProducts(query: Query) {
      const resPerPage = Number(query.result) || 3
      const currentPage = Number(query.page) || 1
      const skip = resPerPage * (currentPage - 1)
      const keyword = query.keyword ?{
        title : {
          $regex: query.keyword,
          $options: 'i'
        }
      }:{};
      const products = await this.productModel.find({...keyword}).limit(resPerPage).skip(skip)
      .populate('author').sort({price: 1}).exec();// use populate 
      return products.map((prod) => ({
        id: prod.id, 
        title: prod.title, 
        description : prod.description, 
        price : prod.price,
        author: prod.author, // add author field
      }));
    }
    
    async getSingleProduct(productId: string) {
        const product = (await this.findProduct(productId)).populate('author');//populate
        return {
            id: (await product).id, 
            title: (await product).title, 
            description : (await product).description, 
            price : (await product).price,
            author: (await product).author, // add author field
          };
    }

    async updateProduct(
      productId: string,
      title: string,
      desc: string,
      price: number,
      authorId: string,
        
      ) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
          updatedProduct.title = title;
        }
        if (desc) {
          updatedProduct.description = desc;
        }
        if (price) {
          updatedProduct.price = price;
        }
        if (authorId) {  //added
          const author = await this.authorModel.findById(authorId);
          if (!author) {
            throw new NotFoundException('Author not found');
          }
          updatedProduct.author = author;
        }
        updatedProduct.save();
      }
    
    async deleteProduct(prodId:string){
       await this.productModel.deleteOne({_id: prodId}).exec();
      
    }
    async getProductsByPriceRange(minPrice: number, maxPrice: number) {
      const products = await this.productModel.find({price: {$gte: minPrice, $lte: maxPrice}}).populate('author').exec();
                                              
      return products.map((prod) => ({
        id: prod.id, 
        title: prod.title, 
        description : prod.description, 
        price : prod.price,
        author: prod.author,
      }));
    }
  
    private async findProduct(id: string): Promise<Product> {
        let product;
       try { 
            product = await this.productModel.findById(id).exec();
        }
       catch{
            throw new NotFoundException('product not available');
        }
        return product;
    }
}