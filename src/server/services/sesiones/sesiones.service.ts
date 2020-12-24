import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SesionesEntity } from 'src/server/models/sesiones/entities/sesione.entity';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { CreateSesioneDto } from '../../dtos/sesiones/create-sesione.dto';
import { UpdateSesioneDto } from '../../dtos/sesiones/update-sesione.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SesionesService {

  constructor(
    @InjectModel(SesionesEntity) private readonly sesionesEntity: ReturnModelType<typeof SesionesEntity>,
    private readonly usuariosService: UsuariosService
  ) {}
  
  async create(usuario: string, createSesioneDto: SesionesEntity) {
    try {
      // retornamos el id del usuario...
      const usuarioModel: UsuarioModel = await this.usuariosService.retornaUsuario(usuario);
      // seteamos el id...
      createSesioneDto.profesor_id = usuarioModel._id;
      // creamos el uuid...
      createSesioneDto.sesion_identificador = uuidv4();
      // nueva sesion...
      const nuevaSesion = new this.sesionesEntity(createSesioneDto);
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
    // retornamos el id del usuario...
    const usuarioModel: UsuarioModel = await this.usuariosService.retornaUsuario(usuario);
    // buscamos las sesiones que tenga el profesor...
    // filtro...
    const filtro = {
      profesor_id: usuarioModel._id,
      "auditoria.estado": estado
    }
    // return...
    return await this.sesionesEntity.find(filtro);
  }

  findOne(id: number) {
    return `This action returns a #${id} sesione`;
  }

  async update(id: string, updateSesioneDto: SesionesEntity) {
    try {
      // recogiendo datos...
      const { descripcion, observacion, fecha_hora_inicio, fecha_hora_final } = updateSesioneDto;
      // return...
      return await this.sesionesEntity.findByIdAndUpdate(
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
      return await this.sesionesEntity.findByIdAndUpdate(
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
}
