import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose"
import { AuditoriaModel } from "../comuns/auditoria.model";
import { ParcialModel } from "./parcial.model";

export class LectivoModel {

    public readonly _id?: Types.ObjectId;

    @prop({ required: true })
    public fecha_inicio?: Date;
 
    @prop({ required: true })
    public fecha_final?: Date;
 
    @prop({ trim: true })
    public descripcion?: string;
 
    @prop({ default: 0, min: 0 })
    public puntaje_objetivo?: number;
 
    @prop({ _id: false, ref: ParcialModel })
    public parciales?: ParcialModel[];
 
    @prop({ _id: false, ref: AuditoriaModel })
    public auditoria?: AuditoriaModel;

}
