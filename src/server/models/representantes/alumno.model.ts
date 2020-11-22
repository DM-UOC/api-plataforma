import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { MateriaModel } from "../materias/materia.model";
import { HijoModel } from "./hijo.model";

export class AlumnoModel {

    @prop({ type: HijoModel, required: true })
    public hijo_id?: Types.ObjectId;

    @prop({ type: MateriaModel })
    public materias?: MateriaModel[];

}
