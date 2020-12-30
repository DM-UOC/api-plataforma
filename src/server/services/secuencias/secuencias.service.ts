import moment from "moment";

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SecuenciaModel } from '../../../server/models/secuencias/secuencia.model';

@Injectable()
export class SecuenciasService {

    constructor(
        @InjectModel(SecuenciaModel) private readonly secuenciaModel: ReturnModelType<typeof SecuenciaModel>
    ) {}

    async creaSecuencia(secuencialID: string) {
        try {
            // retornando la nueva secuencia...
            return this.secuenciaModel.findOneAndUpdate({
                id: secuencialID
             }, {
                $inc: {
                    secuencia: 1,
                },                 
                $set: {
                    auditoria: {
                        estado: true,
                        fecha_ins: moment().utc().toDate()
                    }
                }
             }, {
                new: true,
                upsert: true
             });
        } catch (error) {
            throw error;
        }
    }
    
}
