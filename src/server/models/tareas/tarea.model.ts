import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import moment from "moment";
import { ReferenciaDatosModel } from "../comuns/referencia.datos.model";
import { ReferenciaUsuarioModel } from "../comuns/referencia.usuario.model";

export class TareaModel {
    
    readonly _id?: Types.ObjectId;

    @prop({ _id: false, type: ReferenciaUsuarioModel })
    profesor?: ReferenciaUsuarioModel;

    @prop({ _id: false, type: ReferenciaDatosModel })
    parcial?: ReferenciaDatosModel;

    @prop({ required: true, trim: true })
    descripcion?: string;

    @prop({ trim: true })
    observacion?: string;
    
    @prop({ required: true, default: moment().utc().toDate() })
    fecha_crea?: Date;

    @prop({ required: true, default: moment().utc().toDate() })
    fecha_entrega?: Date;

    @prop({ _id: false, type: AuditoriaModel })
    auditoria?: AuditoriaModel;

}
