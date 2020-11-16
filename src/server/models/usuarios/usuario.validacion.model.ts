import { prop } from "@typegoose/typegoose";

export class UsuarioValidacionModel {
    
    @prop({ required: true })
    public token: string;

    @prop({ required: true })
    public fecha_validacion: Date;

    @prop({ default: false })
    public correo_validado?: boolean;

}
