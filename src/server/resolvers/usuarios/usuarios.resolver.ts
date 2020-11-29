import { Resolver, Query } from '@nestjs/graphql';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

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
