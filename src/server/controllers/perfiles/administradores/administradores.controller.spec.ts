import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { AdministradoresService } from '../../../services/perfiles/administradores/administradores.service';
import { AdministradoresController } from './administradores.controller';


describe('AdministradoresController', () => {
  let controller: AdministradoresController;
  let service: AdministradoresService;
  let model: UsuarioModel;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministradoresController],
      providers: [AdministradoresService],
      imports: [UsuarioModel]
    }).compile();

    controller = module.get<AdministradoresController>(AdministradoresController);
    service = module.get<AdministradoresService>(AdministradoresService);
    model = module.get<UsuarioModel>(UsuarioModel);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Retorna todos los usuarios de tipo perfil administrador...', async () => {

      jest.spyOn(service, 'findAll').mockImplementation();

      expect(await controller.findAll(1)).toBeGreaterThanOrEqual(0);
    });
  });

});
