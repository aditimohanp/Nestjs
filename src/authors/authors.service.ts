import { Injectable, NotFoundException } from "@nestjs/common";
import { Author } from "./authors.model";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Product, ProductModel } from "src/products/products.model";

@Injectable()
export class AuthorsService{
   private authors: Author[] = [];

   constructor(
    @InjectModel('Author') private readonly authorModel:Model<Author>,
    @InjectModel('Product') private readonly productModel: Model<Product>,//added
    ){}

    async insertAuthor( name:string, bio:string ) {
        const authId  = Math.random().toString();
        const newAuthor = new this.authorModel({
            name,
            bio: bio,
            products: [],//added
          });

      const result= await newAuthor.save();
      return result.id as string;
    }

    async getAuthors() {
      const authors = await this.authorModel.find().exec();
      const populatedAuthors = await Promise.all(
      authors.map(async (auth) => {
      const populatedProducts = await this.productModel
              .find({ author: auth.id })
              .populate('author')
              .exec();
      const products = populatedProducts.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
            return {
              id: auth.id,
              name: auth.name,
              bio: auth.bio,
              products,
            };
          }),
        );
        return populatedAuthors.sort((a,b) => a.name.localeCompare(b.name) );
      }

    async getSingleAuthor(authorId: string) {
        const author = await this.findAuthor(authorId);
        const products = await this.productModel.find({ author: author._id }).exec();
      
        const total_price = await this.productModel.aggregate([
          
          {
            $match: {
              "author": author._id,}
          },
          {
            $group: {
              _id: null,
              total_price: { $sum: "$price" },
            }
          },
          {
            $project: {
              _id: 0,
              total_price: 1
            }
          }
        ]).exec();
      
        return {
          id: author.id,
          name: author.name,
          bio: author.bio,
          products: products,
          total_price: total_price[0]?.total_price || 0
        };
      }

    async updateAuthor(
        authorId: string,
        name: string,
        bio: string,
        
      ) {
        const updatedAuthor = await this.findAuthor(authorId);
        if (name) {
          updatedAuthor.name = name;
        }
        if (bio) {
          updatedAuthor.bio = bio;
        }
        
        updatedAuthor.save();
      }
      async deleteAuthor(authorId: string) {//updated
        const author = await this.findAuthor(authorId);
        author.products.forEach(async (prodId) => {
          const product = await this.productModel.findById(prodId);
          product.author = null;
          await product.save();
        });
    
        await this.authorModel.deleteOne({ _id: authorId }).exec();
      }
    
    private async findAuthor(id: string): Promise<Author> {
        let author;
       try { 
            author = await this.authorModel.findById(id).exec();
        }
       catch{
            throw new NotFoundException('author not available');
        }
        return author;
    
    }

}