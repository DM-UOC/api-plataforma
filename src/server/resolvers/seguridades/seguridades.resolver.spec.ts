import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { CatalogosModule } from '../../modules/catalogos/catalogos.module';
import { CatalogosService } from '../../services/catalogos/catalogos.service';
import { SeguridadesService } from '../../services/seguridades/seguridades.service';
import { SeguridadesResolver } from './seguridades.resolver';

describe('SeguridadesResolver', () => {
  let resolver: SeguridadesResolver;
  let service: SeguridadesService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguridadesResolver, SeguridadesService],
      imports: [CatalogosModule, UsuariosModule, CatalogosService]
    }).compile();

    resolver = module.get<SeguridadesResolver>(SeguridadesResolver);
    service = module.get<SeguridadesService>(SeguridadesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
