import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { HijoModel } from "./hijo.model";

export class RepresentanteModel {

    readonly _id: Types.ObjectId;
    
    @prop({ required: true })
    public usuario_id?: Types.ObjectId;

    @prop({ required: true, type: HijoModel })
    public hijos?: HijoModel[];

    @prop({ _id: false, type: AuditoriaModel })
    public auditoria?: AuditoriaModel;

}
