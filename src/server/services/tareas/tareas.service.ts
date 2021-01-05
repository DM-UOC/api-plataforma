import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TareaModel } from 'src/server/models/tareas/tarea.model';
import { CreateTareaDto } from '../../dtos/tareas/create-tarea.dto';
import { UpdateTareaDto } from '../../dtos/tareas/update-tarea.dto';

import moment from "moment";
import { ProfesoresService } from '../perfiles/profesores/profesores.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ClientesService } from '../perfiles/clientes/clientes.service';
import { LectivosService } from '../lectivos/lectivos.service';

@Injectable()
export class TareasService {

  constructor(
    @InjectModel(TareaModel) private readonly tareaModel: ReturnModelType<typeof TareaModel>,
    private readonly profesoresService: ProfesoresService,
    private readonly usuariosService: UsuariosService,
    private readonly lectivosService: LectivosService
  ) {}
  
  async create(createTareaDto: CreateTareaDto) {
    try {
      // desestructuramos el objeto...
      const { tarea, profesor } = createTareaDto;
      // busamos la información del usuario y profesor...
      const usuario = await this.usuariosService.retornaUsuario(profesor.usuario);
      const profesorInfo = await this.profesoresService.findOne((usuario._id).toString());
      // retornando informacion del parcial...
      const parcial = await this.lectivosService.retornaParcialActivo(true);
      // isntancia..
      const nuevaTarea = new this.tareaModel({
        descripcion: tarea.descripcion,
        observacion: tarea.observacion,
        profesor: {
          id: profesorInfo._id,
          usuario: profesor.usuario,
          nombres: profesor.nombres          
        },
        parcial: {
          id: parcial[0].parciales[0]._id,
          descripcion: parcial[0].parciales[0].descripcion
        },
        auditoria: {
          estado: true,
          fecha_ins: moment().utc().toDate()
        }        
      });
      // return...
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
    return this.tareaModel.findById(id);
  }

  update(id: string, updateTareaDto: TareaModel) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: string) {
    return `This action removes a #${id} tarea`;
  }

}
