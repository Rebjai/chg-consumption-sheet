import { Test, TestingModule } from '@nestjs/testing';
import { AreasController } from './areas.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAreaDto } from '../application/dto/create-area.dto';
import { UpdateAreaDto } from '../application/dto/update-area.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('AreasController', () => {
  let controller: AreasController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<AreasController>(AreasController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('create', () => {
    it('should call commandBus.execute with CreateAreaCommand', async () => {
      const dto: CreateAreaDto = { name: 'New Area' };
      const result = { id: 1, name: 'New Area' };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(result);

      const response = await controller.create(dto);
      expect(commandBus.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call queryBus.execute with GetAllAreasQuery', async () => {
      const pagination: PaginationDto = { limit: 10, page: 0 };
      const result = [{ id: 1, name: 'Area 1' }];
      jest.spyOn(queryBus, 'execute').mockResolvedValue(result);

      const response = await controller.findAll(pagination);
      expect(queryBus.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should call queryBus.execute with GetAreaByIdQuery', async () => {
      const id = '1';
      const result = { id: 1, name: 'Area 1' };
      jest.spyOn(queryBus, 'execute').mockResolvedValue(result);

      const response = await controller.findOne(id);
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(Object));
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call commandBus.execute with UpdateAreaCommand', async () => {
      const id = '1';
      const dto: UpdateAreaDto = { name: 'Updated Area' };
      const result = { id: 1, name: 'Updated Area' };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(result);

      const response = await controller.update(id, dto);
      expect(commandBus.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call commandBus.execute with RemoveAreaCommand', async () => {
      const id = '1';
      const result = { deleted: true };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(result);

      const response = await controller.remove(id);
      expect(commandBus.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });
});
