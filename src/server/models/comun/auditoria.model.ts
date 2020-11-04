import moment from 'moment';
import { ModelOptions, prop } from "@typegoose/typegoose";

export class AuditoriaModel {

    @prop({ 
        required: true,
        default: true
    })
    public estado!: boolean;
    
    @prop()
    public usuario_ins?: string;
    
    @prop({ default: moment().utc() })
    public fecha_ins?: string;
    
    @prop()
    public usuario_upd?: string;
    
    @prop()
    public fecha_upd?: string;

}