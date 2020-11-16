import { Module } from '@nestjs/common';
import { AdministradoresService } from '../../../services/perfiles/administradores/administradores.service';
import { AdministradoresController } from '../../../controllers/perfiles/administradores/administradores.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { CatalogosModule } from '../../catalogos/catalogos.module';

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
  controllers: [AdministradoresController],
  providers: [AdministradoresService]
})
export class AdministradoresModule {}
