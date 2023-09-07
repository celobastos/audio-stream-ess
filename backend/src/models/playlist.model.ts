import BaseModel from './base.model';

export default class PlaylistModel extends BaseModel {
  name: string;
  genre: string;
  description: string;
  idUser: number;

  constructor(data: PlaylistModel) {
    super(data.id || '');
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.idUser = data.idUser;
  }
}
