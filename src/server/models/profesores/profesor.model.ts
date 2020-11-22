import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { EstudioModel } from "./estudio.model";
import { MateriaProfesorModel } from "./materia.profesor.model";

export class ProfesorModel {

    @prop({ required: true })
    public usuario_id?: Types.ObjectId;

    @prop({ type: MateriaProfesorModel, _id:false })
    public materias: MateriaProfesorModel[];
    
    @prop({ type: EstudioModel, _id: false })
    public estudios?: EstudioModel[];

    @prop({ type: AuditoriaModel, _id: false })
    public auditoria?: AuditoriaModel;

}
