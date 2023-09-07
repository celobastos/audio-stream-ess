import { Playlist } from '@prisma/client';
import PlaylistRepository from '../repositories/playlist.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  public async getPlaylists(): Promise<Playlist[]> {
    return await this.playlistRepository.getPlaylists();
  }

  public async getPlaylist(id: number): Promise<Playlist | null> {
    const playlist = await this.playlistRepository.getPlaylist(id);

    if (!playlist) {
      throw new HttpNotFoundError({
        msg: 'Playlist not found',
      });
    }

    return playlist;
  }

  // public async createPlaylist(data: PlaylistEntity): Promise<PlaylistModel> {
  //   const playlistEntity = await this.playlistRepository.createPlaylist(data);
  //   const playlistModel = new PlaylistModel(playlistEntity);

  //   return playlistModel;
  // }

  // public async updatePlaylist(id: string, data: PlaylistEntity): Promise<PlaylistModel> {
  //   const playlistEntity = await this.playlistRepository.updatePlaylist(id, data);

  //   if (!playlistEntity) {
  //     throw new HttpNotFoundError({
  //       msg: 'Playlist not found',
  //       msgCode: PlaylistServiceMessageCode.playlist_not_found,
  //     });
  //   }

  //   const playlistModel = new PlaylistModel(playlistEntity);

  //   return playlistModel;
  // }

  // public async deletePlaylist(id: string): Promise<void> {
  //   await this.playlistRepository.deletePlaylist(id);
  // }
}

export default PlaylistService;
