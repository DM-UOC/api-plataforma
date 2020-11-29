import moment from "moment";
import { Types } from 'mongoose';

import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Globals } from 'libs/config/globals';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { ProfesorModel } from '../../../models/profesores/profesor.model';
declare const global: Globals;

@Injectable()
export class ProfesoresService {

    constructor(
      @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
      @InjectModel(ProfesorModel) private readonly profesorModel: ReturnModelType<typeof ProfesorModel>,
      private catalogosService: CatalogosService
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
              "auditoria.estado": true
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
    
      update(id: number, usuarioModel: UsuarioModel) {
        return `This action updates a #${id} administradore`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} administradore`;
      }

}
