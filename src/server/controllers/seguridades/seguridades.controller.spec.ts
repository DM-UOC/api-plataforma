import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { SeguridadesService } from '../../services/seguridades/seguridades.service';
import { SeguridadesController } from './seguridades.controller';

describe('SeguridadesController', () => {
  let controller: SeguridadesController;
  let service: SeguridadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguridadesController],
      providers: [SeguridadesService],
      imports: [UsuariosModule, UsuarioModel]
    }).compile();

    controller = module.get<SeguridadesController>(SeguridadesController);
    service = module.get<SeguridadesService>(SeguridadesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
