import { Module } from '@nestjs/common';
import { CatalogosModule } from './server/modules/catalogos/catalogos.module';
import { PerfilesModule } from './server/modules/perfiles/perfiles.module';
import { SeguridadesModule } from './server/modules/seguridades/seguridades.module';
import { UsuariosModule } from './server/modules/usuarios/usuarios.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AdministradoresModule } from './server/modules/perfiles/administradores/administradores.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true
    }),
    TypegooseModule.forRoot("mongodb://localhost:27017/plataforma", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    CatalogosModule, PerfilesModule, SeguridadesModule, UsuariosModule, AdministradoresModule]
})
export class AppModule {}
