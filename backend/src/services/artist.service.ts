import ArtistEntity from '../entities/artist.entity';
import ArtistModel from '../models/artist.model';
import ArtistRepository from '../repositories/artist.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class ArtistServiceMessageCode {
  public static readonly artist_not_found = 'artist_not_found';
}

class ArtistService {
  private artistRepository: ArtistRepository;

  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }

  public async getArtists(): Promise<ArtistModel[]> {
    const artistsEntity = await this.artistRepository.getArtists();

    const artistsModel = artistsEntity.map(test => new ArtistModel(test));

    return artistsModel;
  }

  public async getArtist(id: string): Promise<ArtistModel> {
    const artistEntity = await this.artistRepository.getArtist(id);

    if (!artistEntity) {
      throw new HttpNotFoundError({
        msg: 'Artist not found',
        msgCode: ArtistServiceMessageCode.artist_not_found,
      });
    }

    const artistModel = new ArtistModel(artistEntity);

    return artistModel;
  }

  public async createArtist(data: ArtistEntity): Promise<ArtistModel> {
    const artistEntity = await this.artistRepository.createArtist(data);
    const artistModel = new ArtistModel(artistEntity);

    return artistModel;
  }

  public async updateArtist(id: string, data: ArtistEntity): Promise<ArtistModel> {
    const ArtistEntity = await this.artistRepository.updateArtist(id, data);

    if (!ArtistEntity) {
      throw new HttpNotFoundError({
        msg: 'Artist not found',
        msgCode: ArtistServiceMessageCode.artist_not_found,
      });
    }

    const artistModel = new ArtistModel(ArtistEntity);

    return artistModel;
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.artistRepository.deleteArtist(id);
  }
}

export default ArtistService;
