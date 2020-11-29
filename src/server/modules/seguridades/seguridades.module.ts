import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { SeguridadesController } from '../../controllers/seguridades/seguridades.controller';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { SeguridadesResolver } from '../../resolvers/seguridades/seguridades.resolver';
import { SeguridadesService } from '../../services/seguridades/seguridades.service';
import { CatalogosModule } from '../catalogos/catalogos.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: UsuarioModel,              
                schemaOptions: {
                    collection: "usuarios",
                    versionKey: false
                }                
            }
        ]),
        CatalogosModule
    ],
    controllers: [SeguridadesController],
    providers: [
        SeguridadesResolver, 
        SeguridadesService
    ]
})
export class SeguridadesModule {}
