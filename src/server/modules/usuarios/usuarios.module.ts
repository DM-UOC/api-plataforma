import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UsuariosController } from '../../controllers/usuarios/usuarios.controller';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { UsuariosResolver } from '../../resolvers/usuarios/usuarios.resolver';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: UsuarioModel,
                schemaOptions: {
                    collection: 'usuarios'
                }
            }
        ])
    ],
    controllers: [
        UsuariosController
    ],
    providers: [
        UsuariosResolver, 
        UsuariosService
    ]
})
export class UsuariosModule {}
