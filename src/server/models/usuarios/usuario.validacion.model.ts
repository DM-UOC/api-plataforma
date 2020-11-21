import { prop } from "@typegoose/typegoose";
import moment from "moment";

export class UsuarioValidacionModel {
    
    @prop({ trim: true })
    public token?: string;

    @prop({ default: null })
    public fecha_validacion?: Date;

    @prop({ default: false })
    public correo_validado?: boolean;

    @prop({ default: false })
    public es_red_social?: boolean;

    @prop({ default: false })
    public esta_validado?: boolean;

}
