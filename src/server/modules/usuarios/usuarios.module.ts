import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';

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
    ]
})
export class UsuariosModule {}
