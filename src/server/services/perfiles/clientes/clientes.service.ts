import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { CatalogosService } from '../../catalogos/catalogos.service';

import moment from "moment";
import { Globals } from 'libs/config/globals';
declare const global: Globals;

@Injectable()
export class ClientesService {

    constructor(
        @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
        private catalogosService: CatalogosService
    ) {}
    
    public async findOneProfile(id: string) {
        try {
          const usuario: UsuarioModel = await this.usuarioModel.findById(id);
          if (!usuario) throw new NotFoundException('Image does not exist!');
          return usuario;
        } catch (error) {
          throw error;
        }
    }
    
    private async retornaPerfilProfesor() {
        try {
            // configuración...
            const { catalogos } = global.$config;
            const { tipoCliente } = catalogos;
            // retorna catalog tipo administrador...
            return await this.catalogosService.retornaCatalogPorCodigo(tipoCliente);      
        } catch (error) {
            throw error;
        }
    }

    public async findAll(@Req() req, estado: boolean = true) {
        try {
            // obtemos el host...
            const host = req.get('host');

            // query usuarios...
            const perfil = await this.retornaPerfilProfesor();
            // filtro...
            const filtro = {
              "perfiles.catalogo_id": Types.ObjectId(perfil._id.toString()), 
              "auditoria.estado": true
            };
            // retorna datos...
            const rows = await this.usuarioModel.find(filtro);

            // verificamos q exita usuarios...
            if(rows.length > 0) {
              // seteo de imagen...
              rows.forEach((data) => {
                // verificando si es usuario red social...
                if(data.validaciones[0].es_red_social === false) {
                    // retorna la imagen mediante la consulta...
                    data.imagen_url = `http://${host}/clientes/profile/${data._id}`;
                }
              });
            }

            // return...
            return rows;      
        } catch (error) {
            throw error;
        }
    }

}
