import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class ReferenciaUsuarioModel {

    @prop({ required: true })
    id?: Types.ObjectId;

    @prop({ required: true, default: null })
    usuario?: string;

    @prop({ required: true, trim: true, default: null })
    nombres?: string;

}