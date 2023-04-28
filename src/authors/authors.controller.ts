import { Controller, Post, Body, Get, Param, Patch,Delete } from "@nestjs/common";
import { AuthorsService } from "./authors.service";

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) { }

    @Post()
    async addAuthor(
        @Body('name') authName: string,
        @Body('bio') authBio: string,
       
    ) {
        const generatedId = await this.authorsService.insertAuthor(authName, authBio);
        return { id: generatedId };

    }
    @Get()
    async getAllAuthors() {
        const authors= await this.authorsService.getAuthors();
        return authors;
    }
//     @Get(':id')
//     async getAuthor(@Param('id') authorId: string) {
//     const author = await this.authorsService.getSingleAuthor(authorId);
//     return {
//     id: author.id,
//     name: author.name,
//     bio: author.bio,
//     products: author.products,
//     total_price: author.total_price,
//   };
// }


    @Get(':id')
    getAuthor(@Param('id') authId: string) {
      return this.authorsService.getSingleAuthor(authId);
    }
  
    @Patch(':id')
    async updateAuthor(
      @Param('id') authId: string,
      @Body('name') authName: string,
      @Body('bio') authBio: string,
    ) {
      await this.authorsService.updateAuthor(authId, authName, authBio );
      return null;
    }
    
     @Delete(':id')
     async removeAuthor(@Param('id') authId: string){
         this.authorsService.deleteAuthor(authId);
        return null;

    }

}