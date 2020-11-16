import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class UsuarioPerfilModel {

    @prop({ required: true, default: '' })
    catalogo_id?: Types.ObjectId;

    @prop({ required: true, default: '' })
    descripcion?: string;

    @prop({ required: true })
    codigo_perfil?: number;

    @prop({ required: true, default: false })
    super_usuario?: boolean;
    
}
