import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import moment from "moment";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { RepresentanteSesionModel } from "./representante.sesion.model";

export class SesionesModel {

    public readonly _id?: Types.ObjectId;

    @prop({ required: true })
    profesor_id?: Types.ObjectId;

    @prop({ required: true, trim: true })
    sesion_identificador?: string;

    @prop({ required: true, trim: true, max: 100 })
    descripcion?: string;

    @prop({ trim: true, max: 200 })
    observacion?: string;

    @prop({ default: moment().utc() })
    fecha_hora_inicio?: Date;

    @prop({ default: moment().utc() })
    fecha_hora_final?: Date;

    @prop({ default: false })
    concluida?: boolean;

    @prop({ _id: false, type: RepresentanteSesionModel })
    representantes: RepresentanteSesionModel[];

    @prop({ _id: false, type: AuditoriaModel })
    auditoria?: AuditoriaModel;
}
