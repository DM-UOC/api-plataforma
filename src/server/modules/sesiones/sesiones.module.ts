import { Module } from '@nestjs/common';
import { SesionesService } from '../../services/sesiones/sesiones.service';
import { SesionesController } from '../../controllers/sesiones/sesiones.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { SesionesEntity } from 'src/server/models/sesiones/entities/sesione.entity';
import { UsuariosService } from 'src/server/services/usuarios/usuarios.service';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SesionesEntity,
        schemaOptions: {
          collection: "sesiones_virtuales",
          versionKey: false
        }
      }
    ]),
    UsuariosModule
  ],
  controllers: [SesionesController],
  providers: [SesionesService]
})
export class SesionesModule {}
