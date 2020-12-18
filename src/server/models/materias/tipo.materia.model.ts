import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class TipoMateriaModel {
    
    @prop({ required: true, default: '' })
    catalogo_id?: Types.ObjectId;

    @prop({ required: true, default: '' })
    descripcion?: string;
        
}