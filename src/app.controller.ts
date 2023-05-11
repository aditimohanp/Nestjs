import { Body, Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';


interface FileParams {
  fileName: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
    @Post("/upload")
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: "./uploads",
        filename : (req , file , cb ) => {
          cb(null, `${file.originalname}`)
        }
      })

  }))//using interceptors
  
  async uploadfile(){
    return "success";

  }

  @Get( '/getFile')
  getFile(@Res() res : Response , @Body() file : FileParams){
    res.sendFile(path.join(__dirname, "../../uploads/" + file.fileName));
  }
}
