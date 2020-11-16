import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CatalogoModel } from 'src/server/models/catalogos/catalogo.model';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { Globals } from "../../../../../libs/config/globals";
import { CatalogosService } from '../../catalogos/catalogos.service';
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

  async create(file: any, usuarioModel: UsuarioModel) {
    try {
      // configuración...
      const { adminUser } = global.$config;
      const { temporal } = adminUser;      
      // query usuarios...
      const catalogo = await this.retornaPerfilAdministrador();
      // nueva instancia...
      const nuevoUsuario = new this.usuarioModel(usuarioModel);
      // sete data...
      nuevoUsuario.nombre = usuarioModel.nombre;
      nuevoUsuario.apellido = usuarioModel.apellido;
      nuevoUsuario.nombre_completo = usuarioModel.nombre_completo;
      nuevoUsuario.usuario = usuarioModel.usuario;
      nuevoUsuario.clave = await this.usuarioModel.encryptPassword(temporal.clave);
      nuevoUsuario.perfiles.push({
        catalogo_id: catalogo?._id,
        descripcion: catalogo.descripcion,
        codigo_perfil: catalogo.valor1
      });
      // verificando si carga imagen...
      if(!usuarioModel.usuario_imagen.data) {
        // set imagen...
        nuevoUsuario.usuario_imagen.data = file.buffer;
        nuevoUsuario.usuario_imagen.contentType = file.mimetype;
      }
      // return save usuario...
      return nuevoUsuario.save();      
    } catch (error) {
      throw error;
    }
  }

  async findAll(estado: boolean = true) {
    try {
      // query usuarios...
      const perfil = await this.retornaPerfilAdministrador();
      // filtro...
      const filtro = {
        "perfiles.catalogo_id": Types.ObjectId(perfil._id.toString()), 
        "auditoria.estado": true
      };
      // retorna datos...
      const rows = await this.usuarioModel.find(filtro);
      return rows;      
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
