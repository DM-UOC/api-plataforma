import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuariosController } from './usuarios.controller';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [UsuariosService],
      imports: [UsuariosModule]
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
