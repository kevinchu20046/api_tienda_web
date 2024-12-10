import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


export type ProductsDocument = Products & Document;

@Schema()
export class Products{

    @Prop({required:true,unique:true})
    name_product: string

    @Prop({
        required:true,
    })
    price_product: number

    @Prop({required:true})
    amount_product: number

    @Prop({required:true})
    category_product:string

    @Prop({ default: Date.now })
    createdAt_user: Date;

}



export const ProductSchema = SchemaFactory.createForClass(Products)


