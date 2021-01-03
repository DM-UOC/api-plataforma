import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class ReferenciaDatosModel {

    @prop({ required: true })
    _id?: Types.ObjectId;

    @prop({ required: true, default: null })
    descripcion?: string;
    
}