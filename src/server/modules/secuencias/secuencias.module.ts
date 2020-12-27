import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SecuenciaModel } from 'src/server/models/secuencias/secuencia.model';
import { SecuenciasService } from 'src/server/services/secuencias/secuencias/secuencias.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: SecuenciaModel,              
                schemaOptions: {
                    collection: "secuencias",
                    versionKey: false
                }                
            }
        ])
    ],
    exports: [
        SecuenciasService
    ],
    providers: [
        SecuenciasService,
    ]    
})
export class SecuenciasModule {}
