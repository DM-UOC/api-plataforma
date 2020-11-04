import { Request } from 'express';
import jsw from 'jsonwebtoken';
import { getModelForClass } from '@typegoose/typegoose';

import { UsuarioModel } from '../../models/usuario.model';
import { CatalgoService } from '../catalogos/catalogo.service';
import { Globals } from '../../../libs/globals';
declare const global: Globals;

export class SeguridadService {

    private catalgoService: CatalgoService = new CatalgoService()

    public async loginUsuario(req: Request, estado: boolean = true) {
        try {
            // verificamos si existe el usuario...
        } catch (error) {
            throw error;
        }
    }


    private async insertaUsuarioAdministrador(usuarioModel: UsuarioModel) {
        try {
            // configuración...
            const { AdminUser } = global.$config;
            const { usuario, dominio, clave } = AdminUser;
            // seteo usuario administrador...
            usuarioModel.nombre = `${usuario}`;
            usuarioModel.apellido = usuario;
            usuarioModel.usuario = `${usuario}${dominio}`;
            usuarioModel.clave = await UsuarioModel.encryptPassword(clave);
            usuarioModel.auditoria = {
                estado: true
            }
            // return...
            return await getModelForClass(UsuarioModel).create(usuarioModel);
        } catch (error) {
            throw error;
        }
    }

    public async verificaUsuarioInicial() {
        try {
            // configuración...
            const { CATALOGOS } = global.$config;
            const { TIPO_SUPER_ADMINISTRADOR } = CATALOGOS;
            // retorna catalog tipo administrador...
            const catalogo = await this.catalgoService.retornaCatalogPorCodigo(TIPO_SUPER_ADMINISTRADOR);
            // consulta el usuario...
            let userAdmin: UsuarioModel = {
                catalogo_id: catalogo?._id,
                nombre: '',
                usuario: '',
                clave: ''
            };
            let result = await getModelForClass(UsuarioModel).findOne({
                catalogo_id: catalogo?._id
            });
            // verifica usuario...
            if(result === null) {
                // ingresando el usuario administrador...
                userAdmin = await this.insertaUsuarioAdministrador(userAdmin); 
            }
            // return...
            return userAdmin;
        } catch (error) {
            throw error;            
        }
    }

}