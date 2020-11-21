import jwt from 'jsonwebtoken';
import moment from "moment";
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CatalogoModel } from 'src/server/models/catalogos/catalogo.model';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { Globals } from "../../../../libs/config/globals";
import { CatalogosService } from '../catalogos/catalogos.service';
import { Request } from 'express';
import { Types } from 'mongoose';
declare const global: Globals;

@Injectable()
export class SeguridadesService {

    constructor(
        @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
        private catalogosService: CatalogosService
    ) {}

    private async retornaSelectUsuario(usuario: string, estado: boolean = true) {
        // return...
        return await this.usuarioModel.aggregate([
            {
                $match: {
                    "usuario": usuario,
                    "auditoria.estado": estado
                }
            },  {
                $graphLookup: {
                    from: "catalogos",
                    startWith: "$perfiles.catalogo_id",
                    connectFromField: "_id",
                    connectToField: "_id",
                    as: "tipo_perfil"
                }
            }
        ])
    }

    private async obtenerClave(clave: string) {
        try {
            // encriptamos la clave para luego compararla...
            return await this.usuarioModel.decryptPassword(clave);
        } catch (error) {
            throw error;
        }
    }

    private async generaTokenSistema(infoUsuario: any) {
        try {
            // payload...
            const payload = {
                usuario: infoUsuario.usuario,
                nombres: `${infoUsuario.nombre} ${infoUsuario.apellido}`,
                codigo_perfil: infoUsuario.tipo_perfil[0].valor1,
                perfil_descripcion: infoUsuario.tipo_perfil[0].descripcion,
                perfil_menu: infoUsuario.tipo_perfil[0].cadena1
            };
            //return token...
            return jwt.sign(payload, global.$config.security.secret, {
                expiresIn: eval(global.$config.security.maxAge)
            });            
        } catch (error) {
            throw error;
        }
    }

    private async verificaCrendenciales(usuario: string, clave: string, estado: boolean = false) {
        try {
            // mensaje de usuario incorrectos...
            const { correcto, incorrecto } = global.$config.mensajes.login;
            // buscamos solamente el usuario...
            let result: any = await this.retornaSelectUsuario(usuario, estado);
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

    private async insertaUsuarioAdministrador(usuarioModel: UsuarioModel) {
        try {
            // configuración...
            const { adminUser } = global.$config;
            const { usuario, dominio, clave } = adminUser;
            // seteo usuario administrador...
            usuarioModel.nombre = `${usuario}`;
            usuarioModel.apellido = usuario;
            usuarioModel.nombre_completo = `${usuario}`;
            usuarioModel.usuario = `${usuario}${dominio}`;
            usuarioModel.clave = await this.usuarioModel.encryptPassword(clave);
            usuarioModel.correo = `${usuario}${dominio}`;
            usuarioModel.auditoria = {
                estado: true
            }
            // return...
            return await this.usuarioModel.create(usuarioModel);
        } catch (error) {
            throw error;
        }
    }

    public async verificaUsuarioInicial() {
        try {
            // configuración...
            const { catalogos } = global.$config;
            const { tipoAdministrador } = catalogos;
            // retorna catalog tipo administrador...
            const catalogo: CatalogoModel = await this.catalogosService.retornaCatalogPorCodigo(tipoAdministrador);
            // consulta el usuario...
            let userAdmin: UsuarioModel = {
                perfiles: [
                    {
                        catalogo_id: catalogo?._id,
                        descripcion: catalogo.descripcion,
                        codigo_perfil: catalogo.valor1,
                        super_usuario: true
                    }
                ],
                nombre: '',
                usuario: '',
                clave: ''
            };
            // get Id...
            const catalogo_id: string = catalogo?._id.toString();
            // query...
            let result = await this.usuarioModel.findOne({
                "perfiles.catalogo_id": Types.ObjectId(catalogo_id)
            });
            // verifica usuario...
            if(result === null) {
                // ingresando el usuario administrador...
                userAdmin = await this.insertaUsuarioAdministrador(userAdmin); 
            }
            else {
                // actualizamos el objeto...
                userAdmin = result;
            }
            // return...
            return userAdmin;
        } catch (error) {
            throw error;            
        }
    }

    public async loginUsuario(req: Request, estado: boolean = true) {
        try {
            // recogemos parámetros...
            let { usuario, clave } = req.query as any;
            // verificamos si existe...
            const result: any = await this.verificaCrendenciales(usuario, clave, estado);
            // return...
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async retornaMenuUsuario(req: Request) {
        try {
            const { codigo } = req.query;
            // consulta por codigo...
            return await this.catalogosService.retornaCatalogPorCodigo(codigo);                
        } catch (error) {
            throw error;            
        }        
    }

    private async existeUsuarioRedSocial(usuarioModel: UsuarioModel) {
        // filtros...
        const filtro = {
            correo: usuarioModel.correo,
            "validaciones.es_red_social": true,
            "validaciones.esta_validado": true,
            "validaciones.correo_validado": true,
        }
        // consultamos...
        return await this.usuarioModel.findOne(filtro);
    }

    public async verificaUsuarioRedSocial(usuarioModel: UsuarioModel) {
        try {
            // consulta el usuario...
            usuarioModel.validaciones = [
                {
                    es_red_social: true,
                    esta_validado: false,
                    correo_validado: false
                }
            ];
            let result = await this.existeUsuarioRedSocial(usuarioModel);
            /*
            // verifica usuario...
            if(result === null) {
                // ingresando el usuario administrador...
                result = await this.regustraUsuario(userAdmin); 
            }
            else {
                // actualizamos el objeto...
                userAdmin = result;
            }
            */
            // return...
            return result;
        } catch (error) {
            throw error;            
        }
    }

}
