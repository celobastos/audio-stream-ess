import BaseModel from './base.model';

export default class MusicModel extends BaseModel {
  name: string;
  genre: string;

  constructor(data: MusicModel) {
    super(data.id || '');
    this.name = data.name;
    this.genre = data.genre;
  }
}
