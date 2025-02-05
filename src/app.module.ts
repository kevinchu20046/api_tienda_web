import { Module} from '@nestjs/common';

// modulo de base de datos mongo
import { MongooseModule } from '@nestjs/mongoose';

// modulos creados
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { VentasModule } from './ventas/ventas.module';

// modulo de cache
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

// importacion de env
import ConfigEnv from '../config';


@Module({
  imports:[
    CacheModule.registerAsync({
      isGlobal:true,
      useFactory : async function()  {
        return {
          stores:[
            new KeyvRedis(ConfigEnv.get_uri_redis())
          ]
        }
      },
    }),
    MongooseModule.forRoot(ConfigEnv.get_uridb()), 
    UsersModule, 
    AuthModule, 
    ProductsModule, 
    VentasModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})


export class AppModule {}
