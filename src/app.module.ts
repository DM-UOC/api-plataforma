import { Module } from '@nestjs/common';
import { CatalogosModule } from './server/modules/catalogos/catalogos.module';
import { PerfilesModule } from './server/modules/perfiles/perfiles.module';
import { SeguridadesModule } from './server/modules/seguridades/seguridades.module';
import { UsuariosModule } from './server/modules/usuarios/usuarios.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/plataforma", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    CatalogosModule, PerfilesModule, SeguridadesModule, UsuariosModule]
})
export class AppModule {}
