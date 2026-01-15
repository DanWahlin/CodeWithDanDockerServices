import { Router, Request, Response, NextFunction } from 'express';
import featureRepository from '../lib/featureRepository.js';

export default (router: Router): void => {
    router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const features = await featureRepository.getFeatures();
            res.render('index', { features });
        } catch (err) {
            next(err);
        }
    });
};
