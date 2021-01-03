import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TareaModel } from 'src/server/models/tareas/tarea.model';
import { CreateTareaDto } from '../../dtos/tareas/create-tarea.dto';
import { UpdateTareaDto } from '../../dtos/tareas/update-tarea.dto';

import moment from "moment";
import { ProfesoresService } from '../perfiles/profesores/profesores.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class TareasService {

  constructor(
    @InjectModel(TareaModel) private readonly tareaModel: ReturnModelType<typeof TareaModel>,
    private readonly profesoresService: ProfesoresService,
    private readonly usuariosService: UsuariosService
  ) {}
  
  async create(createTareaDto: CreateTareaDto) {
    try {
      const { tarea, profesor } = createTareaDto;
      // reando la tarea...
      const nuevaTarea = new this.tareaModel(tarea);
      // busamos la información del usuario y profesor...
      const usuario = await this.usuariosService.retornaUsuario(profesor.usuario);
      const profesorInfo = await this.profesoresService.findOne((usuario._id).toString());
      // seteando datos del profesor...
      nuevaTarea.profesor._id = profesorInfo._id;
      nuevaTarea.profesor.nombres = profesor.nombres;
      nuevaTarea.profesor.usuario = profesor.usuario;
      // auditoria...
      nuevaTarea.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // return..
      return await nuevaTarea.save();      
    } catch (error) {
      throw error;
    }
  }

  async findAll(estado: boolean = true) {
    // filtro...
    const filtro = {
      "auditoria.estado": estado
    }
    // return...
    return await this.tareaModel.find(filtro);
  }

  findOne(id: string) {
    return `This action returns a #${id} tarea`;
  }

  update(id: string, updateTareaDto: TareaModel) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: string) {
    return `This action removes a #${id} tarea`;
  }

}
