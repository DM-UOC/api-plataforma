import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdministradoresController } from 'src/server/controllers/perfiles/administradores/administradores.controller';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { AdministradoresService } from 'src/server/services/perfiles/administradores/administradores.service';
import { CatalogosModule } from '../catalogos/catalogos.module';
import { fileFilter } from "../../../../libs/config/multer/config"
import { MulterModule } from '@nestjs/platform-express';
import { ProfesoresController } from 'src/server/controllers/perfiles/profesores/profesores.controller';
import { ProfesoresService } from 'src/server/services/perfiles/profesores/profesores.service';
import { ClientesService } from 'src/server/services/perfiles/clientes/clientes.service';
import { ClientesController } from 'src/server/controllers/perfiles/clientes/clientes.controller';

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
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter
      }),
    }),
    CatalogosModule
  ],
  controllers: [AdministradoresController, ProfesoresController, ClientesController],
  providers: [AdministradoresService, ProfesoresService, ClientesService]
})
export class PerfilesModule {}
