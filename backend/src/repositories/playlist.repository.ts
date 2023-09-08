import { PrismaClient, Playlist } from '@prisma/client';

class PlaylistRepository {
  private prefix = 'playlist';
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async getPlaylists(): Promise<Playlist[]> {

    return await this.db.playlist.findMany();
  }

  public async getPlaylist(id: number): Promise<Playlist | null> {
    return await this.db.playlist.findUnique({ where: { id: id } });
  }

  public async createPlaylist(data: Playlist): Promise<Playlist> {
    return await this.db.playlist.create({ data });
  }

  public async updatePlaylist(id: number, data: Playlist): Promise<Playlist | null> {
    return await this.db.playlist.update({ where: { id: id }, data });
  }

  public async deletePlaylist(id: number): Promise<void> {
    await this.db.playlist.delete({ where: { id: id } });
  }
  public async getPlaylistLikesDetails(
    playlistId: number,
  ): Promise<{ count: number; users: Array<{ id: number; name: string }> }> {
    const likes = await this.db.likes.findMany({
      where: { playlistId: playlistId },
      include: { user: true },
    });

    const usersWhoLiked = likes
      .map((like: { user: { id: number; name: string; email?: string } | null }) => {
        if (like.user) {
          return {
            id: like.user.id,
            name: like.user.name,
          };
        } else {
          return undefined;
        }
      })
      .filter(Boolean as unknown as (value: any) => value is { id: number; name: string });

    return {
      count: likes.length,
      users: usersWhoLiked as Array<{ id: number; name: string }>,
    };
  }

  public async removeLikeFromPlaylist(playlistId: number, userId: number): Promise<void> {
    await this.db.likes.delete({
      where: {
        userId_playlistId: {
          userId: userId,
          playlistId: playlistId,
        },
      },
    });
  }

  public async addLikeToPlaylist(playlistId: number, userId: number): Promise<void> {
    await this.db.likes.create({
      data: {
        playlistId: playlistId,
        userId: userId,
      },
    });
  }
}

export default PlaylistRepository;
