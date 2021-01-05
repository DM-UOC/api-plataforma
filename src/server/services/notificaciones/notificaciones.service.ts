import moment from "moment";
import { Globals } from "../../../../libs/config/globals";
declare const global: Globals;

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { NotificacionModel } from '../../../server/models/notificaciones/notificacion.model';
import { CreateNotificacioneDto } from '../../models/notificaciones/dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from '../../models/notificaciones/dto/update-notificacione.dto';
import { SecuenciasService } from '../secuencias/secuencias.service';
import { SesionesModel } from "src/server/models/sesiones/sesion.model";
import { SecuenciaModel } from "src/server/models/secuencias/secuencia.model";
import { ClientesService } from "../perfiles/clientes/clientes.service";
import { ProfesoresService } from "../perfiles/profesores/profesores.service";
import { CatalogosService } from "../catalogos/catalogos.service";
import { Types } from "mongoose";
import { TareaModel } from "src/server/models/tareas/tarea.model";

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectModel(NotificacionModel) private readonly notificacionModel: ReturnModelType<typeof NotificacionModel>,
    private readonly secuenciasService: SecuenciasService,
    private readonly clientesService: ClientesService,
    private readonly profesoresService: ProfesoresService,
    private readonly catalogosService: CatalogosService
  ) {}

  private async generaSecuencial(secuencialID: string) {
    try {
      // creando la secuencia...
      const row: SecuenciaModel = await this.secuenciasService.creaSecuencia(secuencialID);
      // retornando...
      return row.secuencia;
    } catch (error) {
      throw error;
    }
  }

  async creaNotificacionSesion(sesion: SesionesModel, representanteID: string, secuencialID: string) {
    try {
      // configuración...
      const { catalogos } = global.$config;
      const { notificaciones } = catalogos;
      const { tipoHijos } = notificaciones;      
      // retornando la secuencia para la notificacion...
      const notificacionID: number = await this.generaSecuencial(secuencialID); 
      // objeto notificacion..
      const createNotificacioneDto = new this.notificacionModel(); 
      // datos de la notificacion...
      // catalogos...
      const catalogo = await this.catalogosService.retornaCatalogPorCodigo(tipoHijos.tipoSesion);
      // profesor...
      const profesor = await this.profesoresService.buscaPorId(sesion.profesor_id.toString());
      // representante...
      const representante = await this.clientesService.buscaPorId(representanteID);
      // seteo de la notificacion...
      createNotificacioneDto.catalogo._id = catalogo._id;
      createNotificacioneDto.catalogo.descripcion = catalogo.descripcion;
      createNotificacioneDto.profesor._id = profesor[0]._id;
      createNotificacioneDto.profesor.nombres = profesor[0].usuario.nombre_completo;
      createNotificacioneDto.representante._id = representante[0]._id;
      createNotificacioneDto.representante.nombres = representante[0].usuario.nombre_completo;
      createNotificacioneDto.descripcion = sesion.descripcion;
      // cuerpo de la notificaicion...
      createNotificacioneDto.cuerpo_notificacion = {
        id: notificacionID,
        title: sesion.descripcion,
        body: sesion.observacion,
        iconColor: catalogo.cadena2,
        extra: {
          data: JSON.stringify({
            descripcion: sesion.descripcion,
            fecha_hora_inicio: sesion.fecha_hora_inicio,
            fecha_hora_final: sesion.fecha_hora_final
          })
        },
        auditoria: {
          estado: true,
          fecha_ins: moment().utc().toDate()
        }
      }
      // auditoria...
      createNotificacioneDto.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // crea la notificacion...
      return await createNotificacioneDto.save();
    } catch (error) {
      throw error;
    }
  }

  async creaNotificacionTarea(tarea: TareaModel, representanteID: string, secuencialID: string) {
    try {
      // configuración...
      const { catalogos } = global.$config;
      const { notificaciones } = catalogos;
      const { tipoHijos } = notificaciones;      
      // retornando la secuencia para la notificacion...
      const notificacionID: number = await this.generaSecuencial(secuencialID); 
      // objeto notificacion..
      const createNotificacioneDto = new this.notificacionModel(); 
      // datos de la notificacion...
      // catalogos...
      const catalogo = await this.catalogosService.retornaCatalogPorCodigo(tipoHijos.tipoTarea);
      // profesor...
      const profesor = await this.profesoresService.buscaPorId(tarea.profesor.id.toString());
      // representante...
      const representante = await this.clientesService.buscaPorId(representanteID);
      // seteo de la notificacion...
      createNotificacioneDto.catalogo._id = catalogo._id;
      createNotificacioneDto.catalogo.descripcion = catalogo.descripcion;
      createNotificacioneDto.profesor._id = profesor[0]._id;
      createNotificacioneDto.profesor.nombres = profesor[0].usuario.nombre_completo;
      createNotificacioneDto.representante._id = representante[0]._id;
      createNotificacioneDto.representante.nombres = representante[0].usuario.nombre_completo;
      createNotificacioneDto.descripcion = tarea.descripcion;
      // cuerpo de la notificaicion...
      createNotificacioneDto.cuerpo_notificacion = {
        id: notificacionID,
        title: tarea.descripcion,
        body: tarea.observacion,
        iconColor: catalogo.cadena2,
        extra: {
          data: JSON.stringify({
            descripcion: tarea.descripcion,
            observacion: tarea.observacion,
            fecha_entrega: tarea.fecha_entrega
          })
        },
        auditoria: {
          estado: true,
          fecha_ins: moment().utc().toDate()
        }
      }
      // auditoria...
      createNotificacioneDto.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // crea la notificacion...
      return await createNotificacioneDto.save();
    } catch (error) {
      throw error;
    }
  }

  async create(createNotificacioneDto: NotificacionModel) {
    try {
      // instanacia...
      const nuevaNotificacion = new this.notificacionModel(createNotificacioneDto);
      // auditoria...
      nuevaNotificacion.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // crea la notificacion...
      return await nuevaNotificacion.save();
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all notificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }

  async encontrarPorRepresentante(representante_id: string, estado: boolean = true) {
    // filtro...
    const filtro = {
      "representante_id._id": Types.ObjectId(representante_id),
      "auditoria.estado": estado
    };
    // agreggate ....
    return await this.notificacionModel.aggregate([
      {
        $match: filtro
      },  {
        $project: {
          descripcion: 1,
          cuerpo_notificacion: {
            body: 1,
            extra: 1,
            iconColor: 1,
            id: 1,
            title: 1            
          }
        }
      }
    ]);
  }
}
