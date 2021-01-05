import moment from "moment";
import { Globals } from "../../../../libs/config/globals";
declare const global: Globals

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { LectivoTareaModel } from 'src/server/models/lectivos-tareas/lectivo.tarea.model';
import { CreateLectivosTareaDto } from '../../dtos/lectivos-tareas/create-lectivos-tarea.dto';
import { UpdateLectivosTareaDto } from '../../dtos/lectivos-tareas/update-lectivos-tarea.dto';
import { ClientesService } from '../perfiles/clientes/clientes.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { TareasService } from '../tareas/tareas.service';
import { TareaModel } from 'src/server/models/tareas/tarea.model';

@Injectable()
export class LectivosTareasService {

  constructor(
    @InjectModel(LectivoTareaModel) private readonly lectivoTareaModel: ReturnModelType<typeof LectivoTareaModel>,
    private readonly clientesService: ClientesService,
    private readonly tareasService: TareasService,
    private readonly notificacionesService: NotificacionesService
  ) {}
  
  create(createLectivosTareaDto: CreateLectivosTareaDto) {
    return 'This action adds a new lectivosTarea';
  }

  findAll() {
    return `This action returns all lectivosTareas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lectivosTarea`;
  }

  update(id: number, updateLectivosTareaDto: UpdateLectivosTareaDto) {
    return `This action updates a #${id} lectivosTarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} lectivosTarea`;
  }

  async retornaParticipantesTarea(id: string, estado: boolean = true) {
    try {
      // retornando representantes...
      const resultados = await this.lectivoTareaModel.find({
        "tarea.id": Types.ObjectId(id),
        "auditoria.estado": estado
      });
      // recoge solo los identificadores de las materias...
      let representantes = resultados.map(resultado => {
        // busca solo activos...
        if(resultado.auditoria.estado === estado) {
          // retornamos los representantes activos...
          return resultado.representante.id;
        }
      });
      // recogemos los representantes...
      return await this.clientesService.representantesTareas(representantes);
    } catch (error) {
      throw error;
    }
  }

  private async creaRepresentanteTarea(representanteId: string, tareaId: string) {
    try {
      // recuperamons informacion de la tarea...
      const tarea = await this.tareasService.findOne(tareaId);
      // retornamos información del representante...
      const representantes = await this.clientesService.buscaPorId(representanteId);
      let representante: any = representantes.filter(representante => (representante._id).toString() === representanteId);
      representante = representante[0];
      // desestructura l objeto tarea...
      const { descripcion, parcial, profesor } = tarea;
      const { _id, usuario } = representante;
      // registramos la tarea incial lectivo...
      const tareaLectivo = await this.lectivoTareaModel.create({
        tarea: {
          id: tarea._id,
          descripcion
        },
        parcial: {
          id: parcial.id,
          descripcion: parcial.descripcion
        },
        representante: {
          id: _id,
          nombres: usuario.nombre_completo,
          usuario: usuario.usuario
        },
        auditoria: {
          fecha_ins: moment().utc().toDate()
        }
      });
      // devolvemos la tarea..
      return {
        tarea,
        representante,
        tareaLectivo
      };
    } catch (error) {
      throw error;
    }
  }

  private async creaTareaNotificacion(tarea: TareaModel, representante: any) {
    try {
      // configuración...
      const { secuencias } = global.$config;
      const { notificacion } = secuencias;
      const { tareaID } = notificacion;
      // retornamos el tipo de catalogo notificacion...
      return await this.notificacionesService.creaNotificacionTarea(tarea, representante._id, tareaID);      
    } catch (error) {
      throw error;
    }
  }

  async registraRepresentanteTarea(representanteId: string, tareaId: string) {
    try {
      // crea el representante sesión...
      const resultado = await this.creaRepresentanteTarea(representanteId, tareaId);
      // desestructura la información...
      const { tarea, representante } = resultado;
      // crea la notificacion...
      await this.creaTareaNotificacion(tarea, representante);
      // retornamos...
      return tarea;
    } catch (error) {
      throw error;
    }
  }

  async retornaListaRepresentantesTareas(tareaId: string, estado: boolean = true) {
    try {
      return await this.lectivoTareaModel.aggregate([
        {
          $match: {
            "tarea.id": Types.ObjectId(tareaId),
            "auditoria.estado": estado            
          }
        },  {
          $lookup: {
            from: 'representantes',
            localField: 'representante.id',
            foreignField: '_id',
            as: 'representante'            
          }
        },  {
          $unwind: "$representante"
        },  {
          $lookup: {
            from: 'usuarios',
            localField: 'representante.usuario_id',
            foreignField: '_id',
            as: 'usuario'            
          }
        },  {
          $unwind: "$usuario"
        },  {
          $addFields: {
            representantes_tareas: {
              "representante_id": "$representante._id",
              "usuario": "$usuario",
              "hijos": "$representante.hijos",
              "auditoria": "$auditoria"
            }            
          }
        },  {
          $project: {
            representantes_tareas: {
              "usuario": {
                _id: 1,
                nombre_completo: 1
              },
              "hijos": {
                $filter: {
                  input: "$representantes_tareas.hijos",
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

  async retirarRepresentanteTarea(lectivoTareaId: string, representanteId: string, estado: boolean = false) {
    try {
      return await this.lectivoTareaModel.findOneAndUpdate({
        _id: Types.ObjectId(lectivoTareaId),
        "representante.id": Types.ObjectId(representanteId)
      },  {
        $set: {
          "auditoria.estado": estado,
          "auditoria.fecha_upd": moment().utc().toDate()
        }
      },  {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }

}
