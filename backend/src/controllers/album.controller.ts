import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import TestService from '../services/test.service';
import TestEntity from '../entities/test.entity';

class AlbumController {
  private prefix: string = '/album';
  public router: Router;
  private testService: TestService;

  constructor(router: Router, testService: TestService) {
    this.router = router;
    this.testService = testService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.createTest(req, res),
    );
  }

  private async getTests(req: Request, res: Response) {
    const tests = await this.testService.getTests();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: tests,
    }).handle(res);
  }

  private async getOthersTests(req: Request, res: Response) {
    const tests = await this.testService.getOtherTests();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: tests,
    }).handle(res);
  }

  private async getTest(req: Request, res: Response) {
    const test = await this.testService.getTest(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async createTest(req: Request, res: Response) {
    const test = await this.testService.createTest(new TestEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async updateTest(req: Request, res: Response) {
    const test = await this.testService.updateTest(req.params.id, new TestEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async deleteTest(req: Request, res: Response) {
    await this.testService.deleteTest(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default AlbumController;
