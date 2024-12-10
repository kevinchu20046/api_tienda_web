import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from './schema/products.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Products.name, schema: ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[MongooseModule.forFeature([{name: Products.name, schema: ProductSchema}])]
})


export class ProductsModule {}
