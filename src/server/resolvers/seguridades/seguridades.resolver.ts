import { Resolver, Query } from '@nestjs/graphql';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { SeguridadesService } from '../../services/seguridades/seguridades.service';

@Resolver('Seguridades')
export class SeguridadesResolver {

    constructor(
        private seguridadesService: SeguridadesService
    ) {}

    @Query( () => String)
    public async hello() {
        return "world";
    }
    
    @Query('administrador')
    async getAdministrador() {
        const result: UsuarioModel = await this.seguridadesService.verificaUsuarioInicial();
        return result;
    }

}
