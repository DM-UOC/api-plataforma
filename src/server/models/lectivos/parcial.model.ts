import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class ParcialModel {

    public readonly _id?: Types.ObjectId;

    @prop({ required: true })
    public fecha_inicio?: Date;
 
    @prop({ required: true })
    public fecha_final?: Date;
 
    @prop({ trim: true })
    public descripcion?: string;
 
    @prop({ default: 0, min: 0 })
    public puntaje_objetivo?: number;
  
    @prop({ default: true })
    activo?: boolean;

    @prop({ _id: false, ref: AuditoriaModel })
    public auditoria?: AuditoriaModel;
        
}
