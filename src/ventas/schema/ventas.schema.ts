import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Types } from "mongoose";


export type VentasDocument = Ventas & Document;

@Schema()
export class Ventas {

    @Prop({ type:Types.ObjectId, ref: 'user', required: true })
    user_id: Types.ObjectId;


    @Prop([{
        product_id: { type: Types.ObjectId, ref: 'products', required: true },
        amount_product: { type: Number, required: true },
        category_product:{type: String, required:true},
        price_product: { type: Number, required: true },
    }])
    products_sale: { product_id: Types.ObjectId; amount_product: number; category_product:string; price_product: number; }[]



    @Prop({required:true})
    total_sale: number;


    @Prop({required:true, default:Date.now()})
    sale_date: Date
}


export const VentasSchema = SchemaFactory.createForClass(Ventas)