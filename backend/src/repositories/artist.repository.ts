import ArtistsEntity from '../entities/artist.entity';
import BaseRepository from './base.repository';

class ArtistRepository extends BaseRepository<ArtistsEntity> {
  constructor() {
    super('artist');
  }

  public async getArtists(): Promise<ArtistsEntity[]> {
    return await this.findAll();
  }

  public async getArtist(id: string): Promise<ArtistsEntity | null> {
    return await this.findOne(item => item.id === id);
  }

  public async createArtist(data: ArtistsEntity): Promise<ArtistsEntity> {
    return await this.add(data);
  }

  public async updateArtist(id: string, data: ArtistsEntity): Promise<ArtistsEntity | null> {
    return await this.update(item => item.id === id, data);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.delete(item => item.id !== id);
  }
}

export default ArtistRepository;
