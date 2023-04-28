import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "@nestjs/passport";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiProperty, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiBody({
    description: 'Create a new product',
    type: ProductsService, })
    @ApiProperty({ example: 'title , description, price, author-id'})
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('authorId') authorId: string
  ) {
    const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice, authorId);
    return { id: generatedId };
  }

  @Get()
  @UseGuards(AuthGuard()) // you can also pass jwt here
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async getAllProducts(@Query() query: ExpressQuery) {
    const products = await this.productsService.getProducts(query);
    return products;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Get(':minPrice/:maxPrice')
  @ApiOperation({ summary: 'Get products by price range' })
  @ApiResponse({ status: 200, description: 'Return the products.' })
  async getProductRange(@Param('minPrice') minPrice: number, @Param('maxPrice') maxPrice: number) {
    const products = await this.productsService.getProductsByPriceRange(minPrice, maxPrice)
    return products;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('authorId') authorId: string
  ): Promise<any> {
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice, authorId);
    return null;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
  }
}