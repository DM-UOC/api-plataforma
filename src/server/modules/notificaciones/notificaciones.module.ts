import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { NotificacionesController } from '../../controllers/notificaciones/notificaciones.controller';
import { NotificacionModel } from '../../../server/models/notificaciones/notificacion.model';
import { SecuenciasModule } from '../secuencias/secuencias.module';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { CatalogosModule } from '../catalogos/catalogos.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NotificacionModel,              
        schemaOptions: {
          collection: "notificaciones",
          versionKey: false
        }
      },
    ]),
    SecuenciasModule,
    PerfilesModule,
    CatalogosModule
  ],
  exports: [
    NotificacionesService
  ],
  controllers: [NotificacionesController],
  providers: [NotificacionesService]
})
export class NotificacionesModule {}
