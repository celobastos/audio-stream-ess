export default class PlaylistEntity {
  id: number;
  name: string;
  genre: string;
  description: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PlaylistEntity) {
    this.id = data.id;
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.ownerId = data.ownerId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
