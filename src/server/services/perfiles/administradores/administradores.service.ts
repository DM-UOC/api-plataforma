import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { Globals } from "../../../../../libs/config/globals";
import moment from "moment";
declare const global: Globals;

@Injectable()
export class AdministradoresService {

  constructor(
    @InjectModel(UsuarioModel) private readonly usuarioModel: ReturnModelType<typeof UsuarioModel>,
    private catalogosService: CatalogosService
  ) {}

  private async retornaPerfilAdministrador() {
    try {
      // configuración...
      const { catalogos } = global.$config;
      const { tipoAdministrador } = catalogos;
      // retorna catalog tipo administrador...
      return await this.catalogosService.retornaCatalogPorCodigo(tipoAdministrador);      
    } catch (error) {
      throw error;
    }
  }

  async create(@Req() req, file: any, usuarioModel: UsuarioModel) {
    try {
      // configuración...
      const { adminUser } = global.$config;
      const { temporal } = adminUser;      
      // query usuarios...
      const catalogo = await this.retornaPerfilAdministrador();
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
      
      const host = req.get('host');
      row.imagen_url = `http://${host}/administradores/profile/${row._id}`;
      
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
      const perfil = await this.retornaPerfilAdministrador();
      // filtro...
      const filtro = {
        "perfiles.catalogo_id": Types.ObjectId(perfil._id.toString()), 
        "auditoria.estado": estado
      };
      // retorna datos...
      const rows = await this.usuarioModel.find(filtro);
      // seteo de imagen...
      rows.forEach((data) => {
        data.imagen_url = `http://${host}/administradores/profile/${data._id}`;
      });
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
