import { Test, TestingModule } from '@nestjs/testing';
import { SeguridadesResolver } from './seguridades.resolver';

describe('SeguridadesResolver', () => {
  let resolver: SeguridadesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguridadesResolver],
    }).compile();

    resolver = module.get<SeguridadesResolver>(SeguridadesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
