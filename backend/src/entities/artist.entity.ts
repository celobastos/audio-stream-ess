import BaseEntity from './base.entity';

export default class ArtistEntity extends BaseEntity {
  name: string;
  genre: string;
  description: string;
  login: string;
  pass: string;

  constructor(data: ArtistEntity) {
    super(data.id || '');
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.login = data.login;
    this.pass = data.pass;
  }
}
