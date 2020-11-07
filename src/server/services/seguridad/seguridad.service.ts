import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { getModelForClass } from '@typegoose/typegoose';

import { UsuarioModel } from '../../models/usuario.model';
import { CatalgoService } from '../catalogos/catalogo.service';
import { Globals } from '../../../libs/globals';
import { CatalogoModel } from '../../models/catalogo.model';
declare const global: Globals;

export class SeguridadService {

    private catalgoService: CatalgoService = new CatalgoService()

    private async obtenerClave(clave: string) {
        try {
            // encriptamos la clave para luego compararla...
            return await UsuarioModel.decryptPassword(clave);
        } catch (error) {
            throw error;
        }
    }

    private async retornaSelectUsuario(usuario: string, estado: boolean = true) {
        // return...
        return await getModelForClass(UsuarioModel).aggregate([
            {
                $match: {
                    "usuario": usuario,
                    "auditoria.estado": estado
                }
            },  {
                $graphLookup: {
                    from: "catalogos",
                    startWith: "$catalogo_id",
                    connectFromField: "_id",
                    connectToField: "_id",
                    as: "tipo_perfil"
                }
            }            
        ])
    }

    private async generaTokenSistema(infoUsuario: any) {
        try {
            // payload...
            const payload = {
                usuario: infoUsuario.usuario,
                nombres: `${infoUsuario.nombre} ${infoUsuario.apellido}`,
                perfil_id: infoUsuario.tipo_perfil[0].valor1,
                perfil_descripcion: infoUsuario.tipo_perfil[0].descripcion
            };
            //return token...
            return jwt.sign(payload, global.$config.security.secret, {
                expiresIn: eval(global.$config.security.maxAge)
            });            
        } catch (error) {
            throw error;
        }
    }
    
    private async verificaCrendenciales(usuario: string, clave: string) {
        try {
            // mensaje de usuario incorrectos...
            const { correcto, incorrecto } = global.$config.mensajes.login;
            // buscamos solamente el usuario...
            let result: any = await this.retornaSelectUsuario(usuario);
            // verificamos si existe el usuario...
            if(result.length > 0) {
                // existe el usuario...
                // verificamos si la clave son iguales...
                result[0].clave = await this.obtenerClave(result[0].clave);
                // verifica...
                if(result[0].clave === clave) {
                    // existe el usuario, se genera el token...
                    let token = await this.generaTokenSistema(result[0]);
                    // configurando la variable...
                    result = {
                        message: correcto.exito,
                        token
                    };
                }
                else {
                    throw {
                        message: incorrecto.clave
                    };
                }
            }
            else {
                // no existe el usuario, enviamos null...
                throw {
                    message: incorrecto.usuario
                };
            }
            // return...
            return result;            
        } catch (error) {
            throw error;
        }
    }

    public async loginUsuario(req: Request, estado: boolean = true) {
        try {
            
            // recogemos parámetros...
            let { usuario, clave } = req.query as any;
            // verificamos si existe...
            const result: any = await this.verificaCrendenciales(usuario, clave);
            // return...
            return result;
        } catch (error) {
            throw error;
        }
    }


    private async insertaUsuarioAdministrador(usuarioModel: UsuarioModel) {
        try {
            // configuración...
            const { adminUser } = global.$config;
            const { usuario, dominio, clave } = adminUser;
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
            const { catalogos } = global.$config;
            const { tipoSuperAdministrador } = catalogos;
            // retorna catalog tipo administrador...
            const catalogo: CatalogoModel = await this.catalgoService.retornaCatalogPorCodigo(tipoSuperAdministrador);
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

    public async retornaUsuarioMenu(req: Request) {
        try {
            const { codigo } = req.query;
            // filtros...
            const filtro: object = {
                codigo
            };
            // consulta por codigo...
            return <CatalogoModel> await getModelForClass(CatalogoModel).findOne(filtro);                
        } catch (error) {
            throw error;            
        }        
    }
    
}