import { prop } from "@typegoose/typegoose"
import { AuditoriaModel } from "../comuns/auditoria.model";

export class CuerpoNotificacionModel {

    @prop({ required: true })
    id?: number;

    @prop({ required: true, trim: true })
    title?: string;

    @prop({ required: true, trim: true })
    body?: string;

    @prop({ required: true, trim: true })
    extra?: {
      data?: any
    };

    @prop({ required: true, trim: true })
    iconColor?: string;

    @prop({ _id: false, type: AuditoriaModel })
    auditoria: AuditoriaModel;
    
}