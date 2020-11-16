import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
    ) {}

    public async retornaUsuarios() {
        return await this.usuarioModel.find();
    }
}
