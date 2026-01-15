import { Router, Request, Response } from 'express';

export default (router: Router): void => {
    router.get('/', (_req: Request, res: Response) => {
        res.render('about');
    });
};
