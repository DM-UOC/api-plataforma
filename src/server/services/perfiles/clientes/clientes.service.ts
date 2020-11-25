import { Request } from 'express';
import { Types } from 'mongoose';
import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { CatalogosService } from '../../catalogos/catalogos.service';

import moment from "moment";
import { Globals } from 'libs/config/globals';
import { RepresentanteModel } from 'src/server/models/representantes/representante.model';
import { HijoModel } from 'src/server/models/representantes/hijo.model';

declare const global: Globals;

@Injectable()
export class ClientesService {

    constructor(
      @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
      @InjectModel(HijoModel) private readonly hijoModel: ReturnModelType<typeof HijoModel>,
      @InjectModel(RepresentanteModel) private readonly representanteModel: ReturnModelType<typeof RepresentanteModel>,
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

    public async findOneHijoProfile(_id: string): Promise<HijoModel> {
      try {
        const representante: RepresentanteModel = await this.representanteModel.findOne({
          "hijos._id": Types.ObjectId(_id)
        });
        if (!representante) throw new NotFoundException('Image does not exist!');
        // retornando la foto...
        return representante.hijos.find(element => element._id.toString() === _id);
      } catch (error) {
        throw error;
      }
    }

    private async verificaUsuario(usuario: string, activo: string = 'true') {
      try {
        // conviertiendo a tipo boolean...
        let estado =  (activo === 'true');
        // filtro usuario...
        let filtro = {
          usuario,
          "auditoria.estado": estado
        };
        // return...
        return await this.usuarioModel.findOne(filtro);
      } catch (error) {
        throw error;
      }
    }

    private async retornaRepresentante(usuarioModel: UsuarioModel, estado: boolean = true) {
      try {
        // filtro representante...
        let filtroRepresentante = {
          usuario_id: usuarioModel._id,
          "auditoria.estado": estado        
        };
        // retornando datos...
        return await this.representanteModel.findOne(filtroRepresentante);
      } catch (error) {
        throw error;
      }
    }

    public async retornarHijosPorRepresentanteId(@Req() req: Request): Promise<RepresentanteModel> {
      try {
        // parametros...
        let { usuario, estado } = req.query as any;
        // retornando información del usuario...
        const usuarioModel = await this.verificaUsuario(usuario, estado);
        // retorna datos del representante...
        const row = await this.retornaRepresentante(usuarioModel, estado)
        // verificando si existe datos...
        if(row) {
          // armando la imagen del hijo...
          const { hijos } = row;
          // verificando si hay datos...
          if(hijos.length > 0) {
            // get host...
            const host = req.get('host');
            // recorriendo datos...
            hijos.forEach((data) => {
              // retorna la imagen mediante la consulta...
              data.foto_url = `http://${host}/clientes/hijo/${data._id}`;
            });
          }
        }
        // return...
        return row;        
      } catch (error) {
        throw error;
      }
    }

    public async crearHijo(@Req() req, file: any, hijoModel: HijoModel) {
      try {
        const nuevoHijo = new this.hijoModel(hijoModel);
        // calculando la edad del hijo...
        nuevoHijo.edad = moment().diff(hijoModel.fecha_nacimiento, 'years', false);
        // verificando si carga imagen...
        if(!nuevoHijo.foto.data) {
          // set imagen...
          nuevoHijo.foto.data = file.buffer;
          nuevoHijo.foto.contentType = file.mimetype;
        }
        // auditoria...
        nuevoHijo.auditoria = {
          estado: true,
          fecha_ins: moment().utc().toDate()
        };
        // verifica  que existe representane...
        const representante: RepresentanteModel = await this.representanteModel.findOneAndUpdate({
          _id: hijoModel.representante_id,
        },  {
            $push: {
              hijos: nuevoHijo
            }
        });
        // return
        return representante;
      } catch (error) {
        throw error;
      }
    }

    public async verificaRepresentante(req: Request) {
      try {
        // extrayendo el usuario...
        const { usuario } = req.query as any;
        // retornando información del usuario...
        const usuarioModel = await this.verificaUsuario(usuario);
        // verifica  que existe representane...
        const row = await this.retornaRepresentante(usuarioModel);
        // verifica si existe... caso contrio crea
        if(!row) {
          // no existe el usuario tipo representante, lo creamos...
          await this.representanteModel.create({
            usuario_id: usuarioModel._id,
            auditoria: {
              estado: true,
              fecha_ins: moment().utc().toDate()
            }
          });
        }
        // return...
        return row;
      } catch (error) {
        throw error;
      }
    }
}
