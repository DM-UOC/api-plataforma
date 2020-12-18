import moment from "moment";
import { Types } from 'mongoose';

import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Globals } from 'libs/config/globals';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { ProfesorModel } from '../../../models/profesores/profesor.model';
import { MateriasService } from "../../materias/materias.service";
import { MateriaModel } from "src/server/models/materias/materia.model";
declare const global: Globals;

@Injectable()
export class ProfesoresService {

    constructor(
      @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
      @InjectModel(ProfesorModel) private readonly profesorModel: ReturnModelType<typeof ProfesorModel>,
      private catalogosService: CatalogosService,
      private materiasService: MateriasService
    ) {}

    private async retornaPerfilProfesor() {
        try {
            // configuración...
            const { catalogos } = global.$config;
            const { tipoProfesor } = catalogos;
            // retorna catalog tipo administrador...
            return await this.catalogosService.retornaCatalogPorCodigo(tipoProfesor);      
        } catch (error) {
            throw error;
        }
    }
    
    private async setReferenciaProfesor(usuario: UsuarioModel) {
      try {
        return await this.profesorModel.create({
          usuario_id: usuario._id,
          auditoria: {
            fecha_ins: moment().utc().toDate(),
            estado: true
          }
        });
      } catch (error) {
        throw error;
      }
    }

    public async create(@Req() req, file: any, usuarioModel: UsuarioModel) {
      try {
          // configuración...
          const { adminUser } = global.$config;
          const { temporal } = adminUser;      
          // query usuarios...
          const catalogo = await this.retornaPerfilProfesor();
          const catalogo_id: string = catalogo._id.toString();
          // nueva instancia...
          const nuevoUsuario = new this.usuarioModel(usuarioModel);
          // sete data...
          nuevoUsuario.nombre = usuarioModel.nombre;
          nuevoUsuario.apellido = usuarioModel.apellido;
          nuevoUsuario.nombre_completo = usuarioModel.nombre_completo;
          nuevoUsuario.usuario = usuarioModel.usuario || usuarioModel.correo;
          nuevoUsuario.clave = await this.usuarioModel.encryptPassword(temporal.clave);
          nuevoUsuario.correo = usuarioModel.correo;
          nuevoUsuario.perfiles = [
              {
                  catalogo_id: Types.ObjectId(catalogo_id),
                  descripcion: catalogo.descripcion,
                  codigo_perfil: catalogo.valor1
              }
          ];
          nuevoUsuario.auditoria = {
              fecha_ins: moment().utc().toDate()
          };
          // verificando si carga imagen...
          if(!nuevoUsuario.usuario_imagen.data) {
              // set imagen...
              nuevoUsuario.usuario_imagen.data = file.buffer;
              nuevoUsuario.usuario_imagen.contentType = file.mimetype;
          }
          // return save usuario...
          const row = await nuevoUsuario.save();
          // setea la realación con la coleccion profesores...
          await this.setReferenciaProfesor(row);

          // setea la imagen url...
          const host = req.get('host');
          row.imagen_url = `http://${host}/profesores/profile/${row._id}`;
          
          // retornamos...
          return row;    
      } catch (error) {
        throw error;
      }
    }
    
    async findAll(@Req() req, estado: boolean = true) {
        try {
            // obtemos el host...
            const host = req.get('host');

            // query usuarios...
            const perfil = await this.retornaPerfilProfesor();
            // filtro...
            const filtro = {
              "perfiles.catalogo_id": Types.ObjectId(perfil._id.toString()), 
              "auditoria.estado": estado
            };
            // retorna datos...
            const rows = await this.usuarioModel.find(filtro);

            // verificamos q exita usuarios...
            if(rows.length > 0) {
              // seteo de imagen...
              rows.forEach((data) => {
                data.imagen_url = `http://${host}/profesores/profile/${data._id}`;
              });
            }

            // return...
            return rows;      
        } catch (error) {
            throw error;
        }
    }
    
      public async findOneProfile(id: string) {
        try {
          const usuario: UsuarioModel = await this.usuarioModel.findById(id);
          if (!usuario) throw new NotFoundException('Image does not exist!');
          return usuario;
        } catch (error) {
          throw error;
        }
      }
    
      findOne(id: number) {
        return `This action returns a #${id} administradore`;
      }
    
      async update(id: string, file: any, usuarioModel: UsuarioModel): Promise<UsuarioModel> {
        try {
          const {nombre, apellido } = usuarioModel;
          // campos update...
          let update = {
            nombre: usuarioModel.nombre,
            apellido: usuarioModel.apellido,
            nombre_completo: `${nombre} ${apellido}`,
            correo: usuarioModel.correo
          };
          // verificando si actualiza la imagen....
          if(file !== undefined) {
            update['usuario_imagen'] = {
              data: file.buffer,
              contentType: file.mimetype
            };
          }
          // return...
          return await this.usuarioModel.findByIdAndUpdate(
            id,
            update, {
            new: true
          });
        } catch (error) {
          throw error;
        }
      }
    
      async remove(id: string, estado: boolean = false) {
        try {
          return await this.usuarioModel.findByIdAndUpdate(
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

      private async retornaListaMateriasProfesores(estado: boolean) {
        // filtro...
        const filtro = {
          "auditoria.estado": estado
        };
        // retorna datos...
        return await this.profesorModel.aggregate<ProfesorModel>([
          {
            $match: {
              "auditoria.estado": estado
            }
          },  {
            $lookup: {
              from: 'usuarios',
              localField: 'usuario_id',
              foreignField: '_id',
              as: 'profesores'                  
            }
          },  {
            $project: {
              _id: 1,
              usuario_id: 1,
              materias: 1,
              estudios: 1,
              profesores: {
                _id: 1,
                nombre_completo: 1,
                usuario_imagen: 1,
                imagen_url: 1
              }                  
            }
          }
        ]);
      }

      async findAllProfesores(@Req() req, estado: boolean = true) {
        try {
          // obtemos el host...
          const host = req.get('host');
                    
          // retonamos datos de profesores...
          const rows: ProfesorModel[] = await this.retornaListaMateriasProfesores(estado);
          // verificamos q exita usuarios...
          if(rows.length > 0) {
            // seteo de imagen...
            rows.forEach((profesor: any) => {
              // recorremos los profesores asociados...
              profesor.profesores.forEach((usuario: UsuarioModel) => {
                // armando la url para obtener la foto....
                usuario.imagen_url = `http://${host}/profesores/profile/${usuario._id}`;
              });
            });
          }
          // return...
          return rows;
        } catch (error) {
            throw error;
        }
    }

    async retornaMateriasPorProfesor(usuario_id: string) {
      const retornaProfesor = new this.profesorModel();
      // valores del profesor...
      const profesor = await this.profesorModel.findOne({
        usuario_id
      });
      // recoge solo los identificadores de las materias...
      let materias: any = profesor.materias.map(materia => {
        return materia.materia_id;
      });
      // retorna las materias del profesor...
      return await this.materiasService.retornaMateriasProfesor(materias);
    }

    async registraMateriaProfesor(usuario_id: string, materia: MateriaModel) {
      try {
        // retistramos la materia...
        await this.profesorModel.findOneAndUpdate({
          usuario_id
        },  {
          $addToSet: {
            materias: {
              materia_id: materia._id,
              auditoria: {
                estado: true,
                fecha_ins: moment().utc().toDate()
              }
            }
          }
        },  {
          new: true
        });
        // devolvemos actualizada la lista...
        return await this.retornaMateriasPorProfesor(usuario_id);
      } catch (error) {
        throw error;
      }
    }
    
}
