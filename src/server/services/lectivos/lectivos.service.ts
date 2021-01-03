import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { LectivoModel } from 'src/server/models/lectivos/lectivo.model';
import { CreateLectivoDto } from '../../dtos/lectivos/create-lectivo.dto';
import { UpdateLectivoDto } from '../../dtos/lectivos/update-lectivo.dto';
import moment from "moment";
import { ParcialModel } from 'src/server/models/lectivos/parcial.model';

@Injectable()
export class LectivosService {

  constructor(
    @InjectModel(LectivoModel) private readonly lectivoModel: ReturnModelType<typeof LectivoModel>,
  ) {}

  public async create(createLectivoDto: LectivoModel) {
    try {
      const nuevoLectivo = new this.lectivoModel(createLectivoDto);
      // auditoria...
      nuevoLectivo.auditoria = {
        estado: true,
        fecha_ins: moment().utc().toDate()
      }
      // return..
      return await nuevoLectivo.save();
    } catch (error) {
      throw error;
    }
  }

  public async findAll(estado: boolean = true) {
    // filtro...
    const filtro = {
      "auditoria.estado": estado
    }
    // return...
    return await this.lectivoModel.find(filtro);
  }

  findOne(id: number) {
    return `This action returns a #${id} lectivo`;
  }

  async update(id: string, updateLectivoDto: LectivoModel) {
    try {
      // recogiendo datos...
      const { descripcion, puntaje_objetivo, fecha_inicio, fecha_final, } = updateLectivoDto;
      // return...
      return await this.lectivoModel.findByIdAndUpdate(
        id,
        {
          $set: {
            puntaje_objetivo,
            fecha_inicio,
            fecha_final,
            descripcion,
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
      return await this.lectivoModel.findByIdAndUpdate(
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

  public async createParcial(createLectivoDto: LectivoModel) {
    try {
      // ingresa nuevo registro de parciales al registro...
      const lectivo = await this.lectivoModel.findById(createLectivoDto._id);
      // empujando el registro...
      lectivo.parciales = createLectivoDto.parciales;
      // return...
      return await lectivo.save()
    } catch (error) {
      throw error;
    }
  }
  
  public async updateParcial(_id:string, parcialModel: ParcialModel) {
    try {
      return await this.lectivoModel.findByIdAndUpdate({
        "parciales._id": _id
      }, {
        $set: {
          "parciales.$.fecha_inicio": parcialModel.fecha_inicio,
          "parciales.$.fecha_final": parcialModel.fecha_final,
          "parciales.$.puntaje_objetivo": parcialModel.puntaje_objetivo,
          "parciales.$.descripcion": parcialModel.descripcion,
          "parciales.$.auditoria.fecha_upd": moment().utc().toDate(),
        }
      },  {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }
}
