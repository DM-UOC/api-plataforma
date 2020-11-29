import { Test, TestingModule } from '@nestjs/testing';
import { LectivosService } from './lectivos.service';

describe('LectivosService', () => {
  let service: LectivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectivosService],
    }).compile();

    service = module.get<LectivosService>(LectivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
