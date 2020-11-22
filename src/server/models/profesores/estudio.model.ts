import { prop } from "@typegoose/typegoose";
import moment from "moment";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class EstudioModel {
 
    public readonly _id: Types.ObjectId;

    @prop({ default: { id: null, descripcion: '' }})
    public tipo_estudio?: {
        id: Types.ObjectId,
        descripcion: string
    }

    @prop({ trim: true })
    public descripcion?: string;

    @prop({ trim: true })
    public institucion?: string;

    @prop({ default: moment().utc().toDate() })
    public fecha_graduacion?: Date;

    @prop({ type: AuditoriaModel, _id: false })
    public auditoria: AuditoriaModel;
    
}
