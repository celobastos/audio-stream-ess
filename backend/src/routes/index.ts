import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import AlbumController from '../controllers/album.controller';
import ArtistController from '../controllers/artist.controller';
import ArtistService from '../services/artist.service';
import PlaylistController from '../controllers/playlist.controller';
import PlaylistService from '../services/playlist.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router,
    new AlbumController(router, di.getService(TestService)).router,
    new ArtistController(router, di.getService(ArtistService)).router,
    new PlaylistController(router, di.getService(PlaylistService)).router,
  );
};
