import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import moment from "moment";
import { ReferenciaDatosModel } from "../comuns/referencia.datos.model";
import { ReferenciaUsuarioModel } from "../comuns/referencia.usuario.model";

export class TareaParcialModel {

    readonly _id?: Types.ObjectId;

    @prop({ _id: false, type: ReferenciaDatosModel })
    tarea?: ReferenciaDatosModel;

    @prop({ _id: false, type: ReferenciaUsuarioModel })
    representante?: ReferenciaUsuarioModel;

    @prop({ _id: false, type: ReferenciaUsuarioModel })
    alumno?: ReferenciaUsuarioModel;

    @prop({ required: true, default: moment().utc().toDate() })
    fecha_entrega?: Date;
    
    @prop({ required: true, default: 0 })
    calificacion?: number;
    
    @prop({ default: { data: null, contentType: null }})
    archivos?: {
        data: Buffer;
        contentType: string;
    } [];

    @prop({ _id: false, type: AuditoriaModel })
    auditoria?: AuditoriaModel;

}