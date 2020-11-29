import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';

describe('UsuariosResolver', () => {
  let resolver: UsuariosResolver;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosResolver, UsuariosService],
      imports: [UsuariosModule]
    }).compile();

    resolver = module.get<UsuariosResolver>(UsuariosResolver);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
