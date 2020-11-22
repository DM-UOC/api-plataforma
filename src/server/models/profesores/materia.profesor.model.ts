import { prop } from "@typegoose/typegoose";
import { Type } from "js-yaml";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";

export class MateriaProfesorModel {

    @prop({})
    public materia_id?: Types.ObjectId;

    @prop({ type: AuditoriaModel, _id: false })
    public auditoria: AuditoriaModel;
    
}
