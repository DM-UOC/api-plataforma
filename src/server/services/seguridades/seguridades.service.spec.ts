import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { SeguridadesService } from './seguridades.service';

describe('SeguridadesService', () => {
  let service: SeguridadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguridadesService],
      imports: [UsuariosModule]
    }).compile();

    service = module.get<SeguridadesService>(SeguridadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
