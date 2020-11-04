import { ModelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "./comun/auditoria.model";

@ModelOptions({
    schemaOptions: {
        collection: 'catalogos'
    }
})
export class CatalogoModel {

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

    @prop({ type: () => AuditoriaModel })
    public auditoria!: AuditoriaModel;

}