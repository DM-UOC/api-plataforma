import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { ReferenciaDatosModel } from "../comuns/referencia.datos.model";

export class LetivoParcialModel {

    readonly _id?: Types.ObjectId;

    @prop({ _id: false, type: ReferenciaDatosModel })
    profesor?: ReferenciaDatosModel;

    @prop({ _id: false, type: ReferenciaDatosModel })
    materia?: ReferenciaDatosModel;

    @prop({ _id: false, type: ReferenciaDatosModel })
    representante?: ReferenciaDatosModel;

    @prop({ _id: false, type: ReferenciaDatosModel })
    hijo?: ReferenciaDatosModel;

    @prop({ _id: false, type: ReferenciaDatosModel })
    parcial?: ReferenciaDatosModel;

    @prop({ id: false, type: AuditoriaModel })
    auditoria: AuditoriaModel;

}