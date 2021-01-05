import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class ReferenciaDatosModel {

    @prop({ required: true })
    id?: Types.ObjectId;

    @prop({ required: true, default: null })
    descripcion?: string;
    
}