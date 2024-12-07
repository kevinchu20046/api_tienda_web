import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = Users & Document;

@Schema()
export class Users {

    @Prop({require:true})
    name_user: String


    @Prop({require:true,unique:true})
    email_user: String


    @Prop({require:true})
    password: String


    @Prop({require:true})
    role_user: String

    @Prop({ default: Date.now })
    createdAt_user: Date;

}


export const UserSchema = SchemaFactory.createForClass(Users)