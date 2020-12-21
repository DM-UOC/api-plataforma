import { Test, TestingModule } from '@nestjs/testing';
import { ConferenciasService } from './conferencias.service';

describe('ConferenciasService', () => {
  let service: ConferenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConferenciasService],
    }).compile();

    service = module.get<ConferenciasService>(ConferenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
