import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


export type ProductsDocument = Products & Document;

@Schema()
export class Products{

    @Prop({required:true})
    name_product: string;

    @Prop({
        required:true,
    })
    price_product: number;

    @Prop({required:true})
    amount_product: number;

    @Prop({required:true})
    category_product:string;

    @Prop({required:true,default:false})
    is_delete: boolean;

    @Prop({default:null})
    delete_at: Date;

    @Prop({default:null, ref:'users'})
    delete_by: Types.ObjectId

    @Prop({ default: Date.now })
    createdAt_user: Date;

}



export const ProductSchema = SchemaFactory.createForClass(Products)


