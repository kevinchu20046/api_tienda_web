import { BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Ventas, VentasDocument } from './schema/ventas.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from 'src/products/schema/products.schema';
import { RequestWhitUser } from 'src/auth/interface/requestuser.interface';
import { GetProductsQueryDto } from './dto/getquery-venta-dto';
import { findSourceMap } from 'module';


@Injectable()
export class VentasService {

  constructor(
    @InjectModel(Ventas.name) private readonly ventasModel:Model<VentasDocument>,
    @InjectModel(Products.name) private readonly productsModel:Model<ProductsDocument>
  ){}


  // Servicio para la creacion de una  venta
  async createVentasService(createVentaDto: CreateVentaDto,request:RequestWhitUser) {
    try {
      const {products} = createVentaDto;
      const {sub} = request.user;

      let productos_price = []
      
      let total_venta:number  = 0

      for(let item of products){

        const findproduct = await this.productsModel.findById(item.product_id)
        if(!findproduct) throw new BadRequestException(`no se encontro el ID del producto : ${item.product_id}`)

        if(findproduct.amount_product < item.amount_product){
          throw new BadRequestException(`La cantidad vendida: ${item.amount_product} supera al monto actual : ${findproduct.amount_product}`)
        } 
        
        total_venta += findproduct.price_product*item.amount_product 

        productos_price.push({
          ...item,
          category_product:findproduct.category_product,
          price_product:findproduct.price_product
        })
        
        await findproduct.save()
      }
      
      const ventas = {
        user_id:sub, 
        products_sale:productos_price, 
        total_sale:total_venta
      }

      const sale_created =  await this.ventasModel.create(ventas)

      if(!sale_created) throw new InternalServerErrorException('Error en la peticion')

      return [{

        message:'Venta creada',
        sale:sale_created

      }]
      
    } catch (error) {
      throw error
    }
  }


  // servicio para traer todas las ventas realizadas
  async findAllVentasService(query:GetProductsQueryDto) {
    try {
      const findquery = {}

      if(query.category_product) findquery["products_sale.category_product"] = query.category_product

      if(query.total_sale) findquery["total_sale"] = parseInt(query.total_sale)

      const sales = await this.ventasModel.find(findquery)
      if(sales.length === 0) return[{message:'No se encontraron ventas'}]

      if(!sales) throw new InternalServerErrorException('error en la peticion')
      return sales
    } catch (error) {
      throw error
    }
  }


  //Servicio patra traer todas la ventas del cliente
  async findSaleUserService(request:RequestWhitUser){
    try {
      const {sub} = request.user

      const sales = await this.ventasModel.find({user_id:sub})

      if(sales.length === 0 ) return [{message:'este usuario no ha realizado ninguna compra'}] 

      return sales
    } catch (error) {
      throw error
    }


  }

  

}
