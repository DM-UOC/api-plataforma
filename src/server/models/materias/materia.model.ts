import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class MateriaModel {

    public readonly _id: Types.ObjectId;

    @prop({ required: true, trim: true })
    public descripcion?: string;

    @prop({ trim: true })
    public observacion?: string;
    
    @prop({ type: AuditoriaModel, _id: false })
    public auditoria: AuditoriaModel;

}
