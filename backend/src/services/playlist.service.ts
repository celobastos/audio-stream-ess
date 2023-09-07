import PlaylistEntity from '../entities/playlist.entity';
import PlaylistModel from '../models/playlist.model';
import PlaylistRepository from '../repositories/playlist.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class PlaylistServiceMessageCode {
  public static readonly playlist_not_found = 'playlist_not_found';
}

class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  public async getPlaylists(): Promise<PlaylistModel[]> {
    const playlistsEntity = await this.playlistRepository.getPlaylists();

    const playlistsModel = playlistsEntity.map(test => new PlaylistModel(test));

    return playlistsModel;
  }

  public async getPlaylist(id: string): Promise<PlaylistModel> {
    const playlistEntity = await this.playlistRepository.getPlaylist(id);

    if (!playlistEntity) {
      throw new HttpNotFoundError({
        msg: 'Playlist not found',
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async createPlaylist(data: PlaylistEntity): Promise<PlaylistModel> {
    const playlistEntity = await this.playlistRepository.createPlaylist(data);
    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async updatePlaylist(id: string, data: PlaylistEntity): Promise<PlaylistModel> {
    const playlistEntity = await this.playlistRepository.updatePlaylist(id, data);

    if (!playlistEntity) {
      throw new HttpNotFoundError({
        msg: 'Playlist not found',
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async deletePlaylist(id: string): Promise<void> {
    await this.playlistRepository.deletePlaylist(id);
  }
}

export default PlaylistService;
