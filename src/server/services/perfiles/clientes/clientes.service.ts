import { Request } from 'express';
import { Types } from 'mongoose';
import moment from "moment";

import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Globals } from 'libs/config/globals';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { RepresentanteModel } from '../../../models/representantes/representante.model';
import { HijoModel } from '../../../models/representantes/hijo.model';

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

    private async verificaUsuario(usuario: string, estado: boolean = true) {
      try {
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

    private async retornaRepresentante(usuarioModel: UsuarioModel, estado: boolean = true): Promise<RepresentanteModel> {
      try {
        // filtro representante...
        let filtroRepresentante = {
          usuario_id: usuarioModel._id,
          "auditoria.estado": estado        
        };
        // retornando datos...
        const rows: RepresentanteModel[] = await this.representanteModel.aggregate([
          {
            $match: filtroRepresentante
          },  {
            $project: {
              usuario_id: 1,
              hijos: {
                $filter: {
                  input: "$hijos",
                  as: "hs",
                  cond: {
                    $eq: ["$$hs.auditoria.estado", true]
                  }
                }                
              }
            }
          }
        ]);
        // return...
        return rows[0];
      } catch (error) {
        throw error;
      }
    }

    public async retornarHijosPorRepresentanteId(@Req() req: Request): Promise<RepresentanteModel> {
      try {
        // parametros...
        let { usuario, estado } = req.query as any;
        // convirtiendo a valor true...
        estado = (estado === "true");
        // retornando información del usuario...
        const usuarioModel = await this.verificaUsuario(usuario, estado);
        // retorna datos del representante...
        const row: RepresentanteModel = await this.retornaRepresentante(usuarioModel, estado);
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
          // verifica si está seteado el archivo...
          if(file !== undefined) {
            // set imagen...
            nuevoHijo.foto.data = file.buffer;
            nuevoHijo.foto.contentType = file.mimetype;
          }
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

    public async actualizaHijo(@Req() req, file: any, hijoModel: HijoModel) {
      try {
        // objeto update...
        let update = {};
        // desestructurando el objeto...
        let { nombre, apellido, edad, fecha_nacimiento, nombre_completo } = hijoModel;
        // calculando la edad del hijo...
        edad = moment().diff(fecha_nacimiento, 'years', false);
        // seteo de valores a actualizar...
        update['hijos.$[hijoID].nombre'] = nombre;
        update['hijos.$[hijoID].apellido'] = apellido;
        update['hijos.$[hijoID].nombre_completo'] = nombre_completo;
        update['hijos.$[hijoID].fecha_nacimiento'] = fecha_nacimiento;
        update['hijos.$[hijoID].edad'] = edad;
        // verificando si actualiza la imagen....
        if(file !== undefined) {
          // set imagen...
          update['hijos.$[hijoID].foto.data'] = file.buffer;
          update['hijos.$[hijoID].foto.contentType'] = file.mimetype;
        }
        // auditoria...
        update['hijos.$[hijoID].auditoria.fecha_upd'] = moment().utc().toDate();

        // verifica  que existe representane...
        const representante: RepresentanteModel = await this.representanteModel.findOneAndUpdate({
          _id: hijoModel.representante_id,
          "hijos._id": hijoModel._id
        },  {
            $set: update
        },  {
            new: true,
            arrayFilters: [
              {
                "hijoID._id": hijoModel._id
              }
            ]
        });

        // get host...
        const host = req.get('host');
        // recorriendo datos...
        representante.hijos.forEach((data) => {
          // verifica el id es igual al valor que se editó para actualizar la imagen...
          if(data._id.toString() === hijoModel._id.toString()) {
            // retorna la imagen mediante la consulta...
            data.foto_url = `http://${host}/clientes/hijo/${data._id}`;
          }
        });
        // return
        return representante;
      } catch (error) {
        throw error;
      }
    }

    async eliminaHijo(_id: string, estado: boolean = false) {
      try {
        // update estado eliminado...
        return await this.representanteModel.findOneAndUpdate({
            "hijos._id": Types.ObjectId(_id)
          },  {
            $set: {
              'hijos.$[hijoID].auditoria.estado': estado,
              'hijos.$[hijoID].auditoria.fecha_upd': moment().utc().toDate()
            }
          },  {
            new: true,
            arrayFilters: [
              {
                "hijoID._id": Types.ObjectId(_id)
              }
            ]
          });
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
