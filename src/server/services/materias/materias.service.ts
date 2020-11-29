import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { MateriaModel } from '../../models/materias/materia.model';
import moment from "moment";

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

  update(id: number, updateMateriaDto: MateriaModel) {
    return `This action updates a #${id} materia`;
  }

  remove(id: number) {
    return `This action removes a #${id} materia`;
  }
}
