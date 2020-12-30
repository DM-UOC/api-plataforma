import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { MenuModel } from "../comuns/menu.model";

export class CatalogoModel {

    public readonly _id?: Types.ObjectId;

    @prop({ unique: true })
    public codigo?: string;

    @prop({ required: true })
    public descripcion?: string;


    @prop({ default: 0 })
    public valor1?: number;

    @prop({ default: 0 })
    public valor2?: number;

    @prop({ default: 0 })
    public valor3?: number;

    @prop({ default: '' })
    public cadena1?: string;

    @prop({ default: '' })
    public cadena2?: string;

    @prop({ default: '' })
    public cadena3?: string;

    @prop({ _id: false })
    public arreglo1?: MenuModel[];

    @prop({ type: () => AuditoriaModel })
    public auditoria?: AuditoriaModel;

}
