import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
      imports: [UsuariosModule]
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
