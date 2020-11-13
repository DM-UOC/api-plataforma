import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SeguridadesController } from 'src/server/controllers/seguridades/seguridades.controller';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { SeguridadesService } from 'src/server/services/seguridades/seguridades.service';
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
    providers: [SeguridadesService]
})
export class SeguridadesModule {}
