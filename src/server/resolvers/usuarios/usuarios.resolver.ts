import { Resolver, Query } from '@nestjs/graphql';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { UsuariosService } from 'src/server/services/usuarios/usuarios.service';

@Resolver()
export class UsuariosResolver {

    constructor(
        private usuariosService: UsuariosService
    ) {}

    @Query( () => String)
    public async hello() {
        return "world";
    }

    @Query( () => [UsuarioModel])
    public async usuarios() {
        return await this.usuariosService.retornaUsuarios();
    }
}
