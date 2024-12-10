import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ventas, VentasSchema } from './schema/ventas.schema';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports:[MongooseModule.forFeature([{name: Ventas.name, schema: VentasSchema}]),
    ProductsModule
  ],
  controllers: [VentasController],
  providers: [VentasService],
})

export class VentasModule {}
