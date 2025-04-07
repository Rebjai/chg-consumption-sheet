import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveAreaCommand } from '../../commands/remove-area.command';
import { Area } from 'src/areas/domain/entities/area.entity';

@CommandHandler(RemoveAreaCommand)
export class RemoveAreaHandler implements ICommandHandler<RemoveAreaCommand> {
  constructor(
    @InjectRepository(Area)
    private readonly repo: Repository<Area>,
  ) {}

  async execute(command: RemoveAreaCommand): Promise<void> {
    await this.repo.softDelete(command.id);
  }
}
