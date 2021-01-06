import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Types } from 'mongoose';
import { Globals } from "../../../../libs/config/globals";
declare const global: Globals;

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SesionesModel } from '../../models/sesiones/sesion.model';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ClientesService } from '../perfiles/clientes/clientes.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { ProfesorModel } from "src/server/models/profesores/profesor.model";
import { ProfesoresService } from "../perfiles/profesores/profesores.service";
import { RepresentanteModel } from "src/server/models/representantes/representante.model";

@Injectable()
export class SesionesService {

  constructor(
    @InjectModel(SesionesModel) private readonly sesionesModel: ReturnModelType<typeof SesionesModel>,
    private readonly usuariosService: UsuariosService,
    private readonly clientesService: ClientesService,
    private readonly profesoresService: ProfesoresService,
    private readonly notificacionesService: NotificacionesService
  ) {}
  
  async create(usuario: string, createSesioneDto: SesionesModel) {
    try {
      // retornamos el id del usuario...
      const usuarioModel: UsuarioModel = await this.usuariosService.retornaUsuario(usuario);
      // buscamos el id del profesor...
      const profesorModel: ProfesorModel = await this.profesoresService.findOne(usuarioModel._id.toString());
      // seteamos el id...
      createSesioneDto.profesor_id = profesorModel._id;
      // creamos el uuid...
      createSesioneDto.sesion_identificador = uuidv4();
      // nueva sesion...
      const nuevaSesion = new this.sesionesModel(createSesioneDto);
      // auditoria...
      nuevaSesion.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // return..
      return await nuevaSesion.save();      
    } catch (error) {
      throw error;
    }
  }

  async findAll(usuario: string, estado: boolean = true) {
    try {
      // retornamos el id del usuario...
      const usuarioModel: UsuarioModel = await this.usuariosService.retornaUsuario(usuario);
      // buscamos el id del profesor...
      const profesorModel: ProfesorModel = await this.profesoresService.findOne(usuarioModel._id.toString());
      // buscamos las sesiones que tenga el profesor...
      // filtro...
      const filtro = {
        profesor_id: profesorModel._id,
        "auditoria.estado": estado
      }
      // return...
      return await this.sesionesModel
        .aggregate([
          {
            $match: filtro
          },  {
            $project: {
              fecha_hora_inicio: 1,
              fecha_hora_final: 1,
              descripcion: 1,
              observacion: 1,
              profesor_id: 1,
              sesion_identificador: 1,
              representantes: {
                $filter: {
                  input: "$representantes",
                  as: "rep",
                  cond: {
                    $eq: ["$$rep.auditoria.estado", estado]
                  }
                }
              }
            }
          }
        ]);
    } catch (error) {
      throw error;
    }
  }

  async retornaSesionesRepresentantePorId(usuario: string, estado: boolean = true) {
    try {
      // retornamos el id del usuario...
      const usuarioModel: UsuarioModel = await this.usuariosService.retornaUsuario(usuario);
      // buscamos el id del profesor...
      const representanteModel: RepresentanteModel = await this.clientesService.findOne(usuarioModel._id.toString());
      // buscamos las sesiones que tenga el profesor...
      // return...
      return await this.sesionesModel
        .aggregate([
          {
            $match: {
              "auditoria.estado": estado
            }
          },  {
            $unwind: "$representantes"
          },  {
            $match: {
              "representantes.representante_id": representanteModel._id,
              "representantes.auditoria.estado": estado
            }
          },  {
            $lookup: {
              from: 'profesores',
              localField: 'profesor_id',
              foreignField: '_id',
              as: 'profesor'              
            }
          },  {
            $unwind: "$profesor"
          },  {
            $lookup: {
              from: 'usuarios',
              localField: 'profesor.usuario_id',
              foreignField: '_id',
              as: 'profesor'              
            }
          },  {
            $unwind:  "$profesor"
          },  {
            $project: {
              fecha_hora_inicio: 1,
              fecha_hora_final: 1,
              descripcion: 1,
              observacion: 1,
              profesor_id: 1,
              profesor: {
                _id: 1,
                nombre_completo: 1
              }
            }
          }
        ]);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sesione`;
  }

  async update(id: string, updateSesioneDto: SesionesModel) {
    try {
      // recogiendo datos...
      const { descripcion, observacion, fecha_hora_inicio, fecha_hora_final } = updateSesioneDto;
      // return...
      return await this.sesionesModel.findByIdAndUpdate(
        id,
        {
          $set: {
            descripcion,
            observacion,
            fecha_hora_inicio, 
            fecha_hora_final,
            auditoria: {
              fecha_upd: moment().utc().toDate()
            }
          }
        }, {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, estado: boolean = false) {
    try {
      return await this.sesionesModel.findByIdAndUpdate(
        id, 
        {
          $set: {
            auditoria: {
              estado,
              fecha_upd: moment().utc().toDate()
            }
          }
        },
        {
          new: true
        });
    } catch (error) {
      throw error;
    }
  }

  async retornaParticipantesSesion(_id: string) {
    try {
      // retornamos la sesion...
      const sesion = await this.sesionesModel.findOne({
        _id
      });
      // recoge solo los identificadores de las materias...
      let representantes: any = sesion.representantes.map(representante => {
        // busca solo activos...
        if(representante.auditoria.estado === true) {
          return representante.representante_id;
        }
      });
      // recogemos los representantes...
      return await this.clientesService.representantesSesiones(representantes);
    } catch (error) {
      throw error;
    }
  }

  private async creaRepresentanteSesion(representanteID: string, sesionID: string) {
    try {
      // retornamos la sesion...
      return await this.sesionesModel.findByIdAndUpdate(sesionID, {
        $addToSet: {
          representantes: {
            representante_id: Types.ObjectId(representanteID),
            auditoria: {
              estado: true,
              fecha_ins: moment().utc().toDate()
            }
          }
        }
      },  {
        new: true
      });      
    } catch (error) {
      throw error;
    }
  }

  private async creaNotificacion(sesionModel: SesionesModel, representanteID: string) {
    try {
      // configuración...
      const { secuencias } = global.$config;
      const { notificacion } = secuencias;
      const { sesionID } = notificacion;
      // retornamos el tipo de catalogo notificacion...
      return await this.notificacionesService.creaNotificacionSesion(sesionModel, representanteID, sesionID);
    } catch (error) {
      throw error;
    }
  }

  async registraRepresentanteSesion(representanteID: string, sesionID: string) {
    try {
      // crea el representante sesión...
      const sesionModel = await this.creaRepresentanteSesion(representanteID, sesionID);
      // crea la notificacion...
      await this.creaNotificacion(sesionModel, representanteID);
      // retornamos...
      return sesionModel;
    } catch (error) {
      throw error;
    }
  }

  async retornaListaRepresentantesSesion(sesionID: string, estado: boolean = true) {
    try {
      return await this.sesionesModel.aggregate([
        {
            $match: {
              _id: Types.ObjectId(sesionID)
            }
        },  {
            $unwind: "$representantes"
        },  {
            $match: {
                "representantes.auditoria.estado": estado
            }
        },  {
            $lookup: {
              from: 'representantes',
              localField: 'representantes.representante_id',
              foreignField: '_id',
              as: 'sesion_representantes'            
            }
        },  {
            $unwind: "$sesion_representantes"
        },  {
            $lookup: {
              from: 'usuarios',
              localField: 'sesion_representantes.usuario_id',
              foreignField: '_id',
              as: 'usuario'
            }
        },  {
            $unwind: "$usuario"
        },  {
            $addFields: {
              representantes_sesion: {
                "usuario": "$usuario",
                "hijos": "$sesion_representantes.hijos",
                "auditoria": "$representantes"
              }
            }
        },  {
            $project: {
              representantes_sesion: {
                "usuario": 1,
                "hijos": {
                  $filter: {
                    input: "$representantes_sesion.hijos",
                    as: "h",
                    cond: {
                      $eq: ["$$h.auditoria.estado", true]
                    }
                  }
                },
                "auditoria": 1
              }
            }
        }
      ]);
    } catch (error) {
      throw error;
    }
  }

  async retirarRepresentanteSesion(sesionID: string, representanteID: string, estado: boolean = false) {
    try {
      return await this.sesionesModel.findOneAndUpdate({
        _id: Types.ObjectId(sesionID),
        "representantes.representante_id": Types.ObjectId(representanteID)
      },  {
        $set: {
          "representantes.$[repID].auditoria.estado": estado,
          "representantes.$[repID].auditoria.fecha_upd": moment().utc().toDate()
        }
      },  {
        new: true,
        arrayFilters: [
          {
            "repID.representante_id": Types.ObjectId(representanteID)
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

}
