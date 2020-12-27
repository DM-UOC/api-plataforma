import { prop } from "@typegoose/typegoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class SecuenciaModel {

    @prop({ required: true, trim: true })
    id?: string;

    @prop({ required: true, default: 0 })
    secuencia?: number;

    @prop({ _id: false, type: AuditoriaModel })
    auditoria?: AuditoriaModel;

}
