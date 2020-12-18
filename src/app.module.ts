import { Module } from '@nestjs/common';
import { CatalogosModule } from './server/modules/catalogos/catalogos.module';
import { PerfilesModule } from './server/modules/perfiles/perfiles.module';
import { SeguridadesModule } from './server/modules/seguridades/seguridades.module';
import { UsuariosModule } from './server/modules/usuarios/usuarios.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MateriasModule } from './server/modules/materias/materias.module';
import { typeGooseConexion } from 'libs/database/typegoose.conexion';
import { LectivosModule } from './server/modules/lectivos/lectivos.module';
import { ConferenciasModule } from './server/conferencias/conferencias.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true
    }),
    typeGooseConexion(),
    CatalogosModule, PerfilesModule, SeguridadesModule, UsuariosModule, MateriasModule, LectivosModule, ConferenciasModule]
})
export class AppModule {}
