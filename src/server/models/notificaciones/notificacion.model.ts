import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { CuerpoNotificacionModel } from "./cuerpo.notificacion.model";

export class NotificacionModel {

    readonly _id?: Types.ObjectId;

    @prop({ required: true, default: {
            _id: null,
            descripcion: ''
        }
    })
    catalogo?: {
        _id?: Types.ObjectId;
        descripcion?: string;
    };

    @prop({ required: true, default: {
            _id: null,
            descripcion: ''
        }
    })
    profesor: {
        _id: Types.ObjectId;
        nombres: string;
    };

    @prop({ required: true, default: {
            _id: null,
            descripcion: ''
        }
    })
    representante: {
        _id: Types.ObjectId;
        nombres: string;
    };

    @prop({ required: true, trim: true })
    descripcion?: string;

    @prop({ _id: false, type: CuerpoNotificacionModel })
    cuerpo_notificacion?: CuerpoNotificacionModel;

    @prop({ required: true, default: false })
    leido?: boolean;

    @prop({ _id: false, type: AuditoriaModel })
    auditoria?: AuditoriaModel;
    
}
