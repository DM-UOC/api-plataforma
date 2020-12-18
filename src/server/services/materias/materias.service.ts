import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { MateriaModel } from '../../models/materias/materia.model';
import moment from "moment";
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';

@Injectable()
export class MateriasService {

  constructor(
    @InjectModel(MateriaModel) private readonly materiaModel: ReturnModelType<typeof MateriaModel>
  ) {}

  public async create(createMateriaDto: MateriaModel) {
    try {
      const nuevoHijo = new this.materiaModel(createMateriaDto);
      // auditoria...
      nuevoHijo.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // return..
      return await nuevoHijo.save();
    } catch (error) {
      throw error;
    } 
  }

  public async findAll(estado: boolean = true) {
    // filtro...
    const filtro = {
      "auditoria.estado": estado
    };
    // return...
    return await this.materiaModel.find(filtro);
  }

  findOne(id: number) {
    return `This action returns a #${id} materia`;
  }

  async update(id: string, updateMateriaDto: MateriaModel): Promise<UsuarioModel> {
    try {
      // recogiendo datos...
      const { descripcion, observacion} = updateMateriaDto;
      // return...
      return await this.materiaModel.findByIdAndUpdate(
        id,
        {
          $set: {
            descripcion,
            observacion,
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
      return await this.materiaModel.findByIdAndUpdate(
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

  retornaMateriasProfesor(materias: any []) {
    // devuelve las materias que no esten incluidas en el arreglo...
    return this.materiaModel.find({
      _id: {
        $nin: materias
      }
    });
  }
  
}
