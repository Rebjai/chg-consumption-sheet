import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateAreaCommand } from '../../commands/update-area.command';
import { Area } from 'src/areas/domain/entities/area.entity';

@CommandHandler(UpdateAreaCommand)
export class UpdateAreaHandler implements ICommandHandler<UpdateAreaCommand> {
  constructor(
    @InjectRepository(Area)
    private readonly repo: Repository<Area>,
  ) {}

  async execute(command: UpdateAreaCommand): Promise<Area> {
    const area = await this.repo.findOne({ where: { id: command.id } });
    if (!area) throw new NotFoundException('Area not found');
    area.name = command.name;
    return this.repo.save(area);
  }
}
