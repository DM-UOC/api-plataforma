import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "./comun/auditoria.model";

class Menu {

    @prop({ required: true, trim: true })
    public icono!: string;

    @prop({ required: true, trim: true })
    public descripcion!: string;


    @prop({ required: true, trim: true })
    public pagina!: string;

}

@ModelOptions({
    schemaOptions: {
        collection: 'catalogos'
    }
})
export class CatalogoModel {

    @prop({ required: true })
    public _id!: Types.ObjectId;

    @prop({ unique: true })
    public codigo!: string;

    @prop({ required: true })
    public descripcion!: string;


    @prop({ default: 0 })
    public valor1!: number;

    @prop({ default: 0 })
    public valor2!: number;

    @prop({ default: 0 })
    public valor3!: number;

    @prop({ default: '' })
    public cadena1!: string;

    @prop({ default: '' })
    public cadena2!: number;

    @prop({ default: '' })
    public cadena3!: number;

    @prop()
    public arreglo1!: Menu[];

    @prop({ type: () => AuditoriaModel })
    public auditoria!: AuditoriaModel;

}