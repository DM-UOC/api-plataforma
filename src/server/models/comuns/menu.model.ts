import { prop } from "@typegoose/typegoose";

export class MenuModel {

    @prop({ required: true, trim: true })
    public icono?: string;

    @prop({ required: true, trim: true })
    public descripcion?: string;


    @prop({ required: true, trim: true })
    public pagina?: string;
        
}
