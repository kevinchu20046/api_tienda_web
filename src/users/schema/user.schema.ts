import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = Users & Document;

@Schema()
export class Users {

    @Prop({require:true})
    name_user: string


    @Prop({require:true,unique:true})
    email_user: string


    @Prop({require:true})
    password: string


    @Prop({require:true, default:'Cliente'})
    role_user: string

    @Prop({ default: Date.now })
    createdAt_user: Date;

}


export const UserSchema = SchemaFactory.createForClass(Users)