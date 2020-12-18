import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { MulterModule } from '@nestjs/platform-express';

import { AdministradoresController } from '../../controllers/perfiles/administradores/administradores.controller';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { AdministradoresService } from '../../services/perfiles/administradores/administradores.service';
import { CatalogosModule } from '../catalogos/catalogos.module';
import { fileFilter } from "../../../../libs/config/multer/config"
import { ProfesoresController } from '../../controllers/perfiles/profesores/profesores.controller';
import { ProfesoresService } from '../../services/perfiles/profesores/profesores.service';
import { ClientesService } from '../../services/perfiles/clientes/clientes.service';
import { ClientesController } from '../../controllers/perfiles/clientes/clientes.controller';
import { ProfesorModel } from '../../models/profesores/profesor.model';
import { AlumnoModel } from '../../models/representantes/alumno.model';
import { RepresentanteModel } from '../../models/representantes/representante.model';
import { HijoModel } from '../../models/representantes/hijo.model';
import { MateriasModule } from '../materias/materias.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
        {
          typegooseClass: UsuarioModel,              
          schemaOptions: {
            collection: "usuarios",
            versionKey: false
          }
        },
        {
          typegooseClass: ProfesorModel,
          schemaOptions: {
            collection: "profesores",
            versionKey: false
          }
        },
        {
          typegooseClass: AlumnoModel,
          schemaOptions: {
            collection: "alumnos",
            versionKey: false
          }
        },
        {
          typegooseClass: RepresentanteModel,
          schemaOptions: {
            collection: "representantes",
            versionKey: false
          }
        },
        {
          typegooseClass: HijoModel,
          schemaOptions: {
            collection: "hijos",
            versionKey: false
          }
        }
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter
      }),
    }),
    CatalogosModule,
    MateriasModule
  ],
  controllers: [AdministradoresController, ProfesoresController, ClientesController],
  providers: [AdministradoresService, ProfesoresService, ClientesService]
})
export class PerfilesModule {}
