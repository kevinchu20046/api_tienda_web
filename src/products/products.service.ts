import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schema/products.schema';
import { Model } from 'mongoose';
import { RequestWhitUser } from 'src/auth/interface/requestuser.interface';





@Injectable()
export class ProductsService {

  constructor(@InjectModel(Products.name) private readonly productsModel:Model<ProductsDocument>){}


  // Servicio para la creacion de los productos
  async createProductService(createProductDto: CreateProductDto, request:RequestWhitUser) {
    try {
      const {name_product} = createProductDto

      const findproduct = await this.productsModel.findOne({name_product:name_product})

      if(findproduct){
        throw new ConflictException('El producto ya existe.')
      }

      const newproduct = await this.productsModel.create(createProductDto)

      if(!newproduct){
        throw new InternalServerErrorException('error en la peticion')
      }

      const data = {
        message:'producto creado correctamente',
        product:newproduct._id
      }

      return [data]      
    
    } catch (error) {
      throw error
    }
  }


  // Servicio para listar todos los productos
  async findProductService(filters:{ [key: string]: string }) {
    try {
    
      const products = await this.productsModel.find(filters,{is_delete:false})
      if(products.length === 0) return[{message:'No hay productos registrados'}]

      if(!products) throw new InternalServerErrorException('error en la peticion')

      return products
    } catch (error) {
      throw error
    }
  }


  // Servicio para actualizar un producto
  async updateProductService(id:string, updateProductDto: UpdateProductDto) {
    try {
      const updateproduct = await this.productsModel.updateOne({_id:id},{$set:updateProductDto})

      if(updateproduct.matchedCount === 0 ){
        throw new BadRequestException('No se encontro ningun producto')
      }

      if(updateproduct.modifiedCount === 0 ){
        throw new InternalServerErrorException('Error en la peticion')
      }

      return [{
        message:'Producto actualizado'
      }]

    } catch (error) {
      throw error
    }
  }


  // Servicio para borrar un servicio
  async deleteProductService(id:string, request:RequestWhitUser) {
    try {
      const {} = request.user

      const deleteproduct = await this.productsModel.findByIdAndUpdate(id,{
        is_delete: true,
        delete_at: Date.now(),
        delete_by: request.user.sub
      })
      
      if(!deleteproduct) throw new InternalServerErrorException('Error en la peticion')


      return [{message:'producto eliminado correctamente'}]  
    } catch (error) {
      throw error
    }
  }

}
