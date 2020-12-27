import { Module } from '@nestjs/common';
import { SesionesService } from '../../services/sesiones/sesiones.service';
import { SesionesController } from '../../controllers/sesiones/sesiones.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { SesionesModel } from '../../models/sesiones/sesion.model';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PerfilesModule } from '../perfiles/perfiles.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SesionesModel,
        schemaOptions: {
          collection: "sesiones_virtuales",
          versionKey: false
        }
      }
    ]),
    UsuariosModule,
    PerfilesModule
  ],
  controllers: [SesionesController],
  providers: [SesionesService]
})
export class SesionesModule {}
