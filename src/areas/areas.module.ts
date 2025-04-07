import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './domain/entities/area.entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AreasController } from './interfaces/areas.controller';
import { CreateAreaHandler } from './application/handlers/commands/create-area.handler';
import { UpdateAreaHandler } from './application/handlers/commands/update-area.handler';
import { RemoveAreaHandler } from './application/handlers/commands/remove-area.handler';
import { GetAllAreasHandler } from './application/handlers/queries/get-all-areas.handler';
import { GetAreaByIdHandler } from './application/handlers/queries/get-area-by-id.handler';

const commandHandlers = [
  CreateAreaHandler,
  UpdateAreaHandler,
  RemoveAreaHandler
];

const queryHandlers = [
  GetAllAreasHandler,
  GetAreaByIdHandler
];

@Module({
  imports:[TypeOrmModule.forFeature([Area]), CqrsModule],
  controllers: [AreasController],
  providers: [
    ...commandHandlers,
    ...queryHandlers
  ],
  exports: [
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class AreasModule {}
