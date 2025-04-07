import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaCommand } from '../../commands/create-area.command';
import { Area } from 'src/areas/domain/entities/area.entity';

@CommandHandler(CreateAreaCommand)
export class CreateAreaHandler implements ICommandHandler<CreateAreaCommand> {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) { }

  async execute(command: CreateAreaCommand): Promise<Area> {
    const { name } = command;
    const newArea = new Area();
    newArea.name = name;
    return await this.areasRepository.save(newArea);
  }
}
