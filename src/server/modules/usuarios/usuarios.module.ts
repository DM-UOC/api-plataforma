import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsuariosController } from 'src/server/controllers/usuarios/usuarios.controller';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { UsuariosResolver } from 'src/server/resolvers/usuarios/usuarios.resolver';
import { UsuariosService } from 'src/server/services/usuarios/usuarios.service';

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
