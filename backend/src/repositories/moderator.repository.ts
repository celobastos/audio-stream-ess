import ModeratorEntity from '../../src/entities/moderator.entity';
import BaseRepository from './base.repository';

class ModeratorRepository extends BaseRepository<ModeratorEntity> {
  constructor() {
    super('moderator');
  }

  public async getModerators(): Promise<ModeratorEntity[]> {
    return await this.findAll();
  }

  public async getModerator(id: string): Promise<ModeratorEntity | null> {
    return await this.findOne(item => item.id === id);
  }

  public async createModerator(data: ModeratorEntity): Promise<ModeratorEntity> {
    return await this.add(data);
  }

  public async updateModerator(id: string, data: ModeratorEntity): Promise<ModeratorEntity | null> {
    return await this.update(item => item.id === id, data);
  }

  public async deleteModerator(id: string): Promise<void> {
    await this.delete(item => item.id !== id);
  }
}

export default ModeratorRepository;
