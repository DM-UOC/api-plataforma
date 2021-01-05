import { Module } from '@nestjs/common';
import { LectivosTareasService } from '../../services/lectivos-tareas/lectivos.tareas.service';
import { LectivosTareasController } from '../../controllers/lectivos-tareas/lectivos.tareas.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { LectivoTareaModel } from 'src/server/models/lectivos-tareas/lectivo.tarea.model';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { TareasModule } from '../tareas/tareas.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
        {
            typegooseClass: LectivoTareaModel,
            schemaOptions: {
                collection: "lectivos_tareas",
                versionKey: false
            }
        }
    ]),
    PerfilesModule,
    TareasModule,
    NotificacionesModule
  ],
  exports: [
    LectivosTareasService
  ],
  controllers: [LectivosTareasController],
  providers: [LectivosTareasService]
})
export class LectivosTareasModule {}
