import { Module } from '@nestjs/common';
import { TareasService } from '../../services/tareas/tareas.service';
import { TareasController } from '../../controllers/tareas/tareas.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TareaModel } from 'src/server/models/tareas/tarea.model';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
        {
            typegooseClass: TareaModel,
            schemaOptions: {
                collection: 'tareas'
            }
        }
    ]),
    PerfilesModule,
    UsuariosModule
  ],
  controllers: [TareasController],
  providers: [TareasService]
})
export class TareasModule {}
