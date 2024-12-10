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
  async findAllProductService() {
    try {
      const products = await this.productsModel.find()
      if(products.length === 0) return[{message:'No hay productos registrados'}]

      if(!products) throw new InternalServerErrorException('error en la peticion')

      return products
    } catch (error) {
      throw error
    }
  }

  //  Servicio para encontrar un producto por nombre
  async findNameProductService(name:string){
    try {
      const findproduct = await this.productsModel.findOne({name_product:name});
      if(!findproduct) return [{message:`No hay ningun producto registrado con este nombre: ${name}`}]

      return [findproduct]
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
  async deleteProductService(id:string) {
    try {
      const deleteproduct = await this.productsModel.deleteOne({_id:id})

      if(deleteproduct.deletedCount===0) throw new InternalServerErrorException('Error en la peticion')
      if(deleteproduct.deletedCount > 0) return [{message:'Producto eliminado correctamente'}]
    } catch (error) {
      throw error
    }
  }

}
