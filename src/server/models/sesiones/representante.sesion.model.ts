import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class RepresentanteSesionModel {

    @prop({ required: true })
    representante_id?: Types.ObjectId;

    @prop({ _id: false, type: AuditoriaModel })
    auditoria?: AuditoriaModel;

}