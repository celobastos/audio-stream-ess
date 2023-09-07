import BaseModel from './base.model';

export default class ArtistModel extends BaseModel {
  name: string;
  genre: string;
  description: string;
  login: string;
  pass: string;

  constructor(data: ArtistModel) {
    super(data.id || '');
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.login = data.login;
    this.pass = data.pass;
  }
}
