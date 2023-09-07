import { Router, Request, Response } from 'express';
import { FailureResult, Result, SuccessResult } from '../utils/result';
import PlaylistService from '../services/playlist.service';

class PlaylistController {
  public prefix = '/playlist';
  public router: Router;
  private playlistService: PlaylistService;

  constructor(router: Router, playlistService: PlaylistService) {
    this.router = router;
    this.playlistService = playlistService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => this.getPlaylists(req, res));
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getPlaylist(req, res),
    );
    // this.router.post(this.prefix,
    // (req: Request, res: Response) => this.createPlaylist(req, res));
    // this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
    //   this.updatePlaylist(req, res),
    // );
    // this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
    //   this.deletePlaylist(req, res),
    // );
    // this.router.put(`${this.prefix}/:id/adicionar`, (req: Request, res: Response) =>
    //   this.updatePlaylist(req, res),
    // );
    // this.router.put(`${this.prefix}/:id/remover/:string`, (req: Request, res: Response) =>
    //   this.updatePlaylist(req, res),
    // );
  }

  private async getPlaylists(req: Request, res: Response) {
    const playlists = await this.playlistService.getPlaylists();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlists,
    }).handle(res);
  }

  private async getPlaylist(req: Request, res: Response) {
    try {
      const playlist = await this.playlistService.getPlaylist(+req.params.id);
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: playlist,
      }).handle(res);
    } catch {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        code: 404,
        msgCode: 'failure',
      }).handle(res);
    }
  }

  // private async createPlaylist(req: Request, res: Response) {
  //   const playlist = new PlaylistEntity(req.body);

  //   const playlistRepository = new PlaylistRepository();

  //   const playlistEntity = await playlistRepository.createPlaylist(playlist);

  //   const playlistModel = new PlaylistModel(playlistEntity);

  //   return new SuccessResult({
  //     msg: Result.transformRequestOnMsg(req),
  //     data: playlistModel,
  //   }).handle(res);
  // }

  // private async updatePlaylist(req: Request, res: Response) {
  //   const test = await this.playlistService.updatePlaylist(
  //     req.params.id,
  //     new PlaylistEntity(req.body),
  //   );

  //   return new SuccessResult({
  //     msg: Result.transformRequestOnMsg(req),
  //     data: test,
  //   }).handle(res);
  // }

  // private async deletePlaylist(req: Request, res: Response) {
  //   await this.playlistService.deletePlaylist(req.params.id);

  //   return new SuccessResult({
  //     msg: Result.transformRequestOnMsg(req),
  //   }).handle(res);
  // }
}

export default PlaylistController;
