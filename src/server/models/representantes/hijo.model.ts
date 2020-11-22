import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class HijoModel {

    public readonly _id: Types.ObjectId;

    @prop({ required: true, trim: true })
    public nombre?: string;

    @prop({ required: true, trim: true })
    public apellido?: string;
    
    @prop({ required: true, trim: true })
    public nombre_completo?: string;

    @prop({ required: true, trim: true })
    public fecha_nacimiento?: Date;

    @prop({ requerid: true, default: 0 })
    public edad: number;
    
}
