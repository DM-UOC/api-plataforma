import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class HijoModel {

    public readonly _id: Types.ObjectId;

    public representante_id: Types.ObjectId;

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

    @prop({ default: { data: null, contentType: null }})
    public foto?: {
        data: Buffer,
        contentType: string
    };
    
    @prop({ default: '' })
    public foto_url?: string;

    @prop({ type: AuditoriaModel, _id: false })
    public auditoria?: AuditoriaModel;

}
