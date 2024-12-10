import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { VentasModule } from './ventas/ventas.module';
import ConfigEnv from '../config';


@Module({
  imports: [MongooseModule.forRoot(ConfigEnv.get_uridb()), UsersModule, AuthModule, ProductsModule, VentasModule],
  // controllers: [AppController],
  // providers: [AppService],
})


export class AppModule {}
