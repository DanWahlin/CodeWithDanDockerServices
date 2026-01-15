import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import exphbs from 'express-handlebars';
import hbsHelpers from 'handlebars-helpers';
import hbsLayouts from 'handlebars-layouts';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'cookie-session';
import csurf from 'csurf';
import favicon from 'serve-favicon';
import merge from 'merge';
import router from 'express-convention-routes';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

// Local modules
import customExpressHbsHelpers from './lib/hbsHelpers/expressHbsHelpers.js';
import db from './lib/database.js';
import redisClient from './lib/redisClient.js';
import productTypeRepository from './lib/productTypeRepository.js';
import config from './lib/configLoader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 8080;
const app = express();

//*************************************************
//        Handlebars template registration
//*************************************************

const customHelpers = merge(customExpressHbsHelpers, hbsHelpers());

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'master',
    helpers: customHelpers,
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
hbsLayouts.register(hbs.handlebars, {});

//*************************************************
//           Middleware and other settings
//*************************************************

app.use(favicon(join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    keys: ['some*key']
}));
app.use(csurf());

//*************************************************
//           Custom middleware
//*************************************************

// Inject product types into all responses
app.use(productTypeRepository.injectProductTypes);

// Pass CSRF token and other locals to views
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals._csrf = req.csrfToken();
    if (req.query.searchtext) {
        res.locals.searchtext = req.query.searchtext;
    }
    res.locals.encodedUrl = encodeURIComponent(
        req.protocol + '://' + req.get('host') + req.originalUrl
    );
    next();
});

//*************************************************
//           Error handling middleware
//*************************************************

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Application error:', err.stack);
    res.status(500).send({ message: err.message });
};

app.use(errorHandler);

process.on('uncaughtException', (err) => {
    if (err) console.error('Uncaught exception:', err, err.stack);
});

//*************************************************
//           Graceful shutdown handlers
//*************************************************

if (process.platform === 'win32') {
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', () => {
        console.log('SIGINT: Closing connections...');
        db.close();
        redisClient.close();
    });
}

process.on('SIGINT', () => {
    console.log('SIGINT: Closing connections...');
    db.close();
    redisClient.close();
});

//*************************************************
//           Convention-based route loading
//*************************************************

router.load(app, {
    routesDirectory: './controllers',
    rootDirectory: __dirname,
    logRoutes: true
});

// 404 handler - must be last
app.use((_req: Request, res: Response, _next: NextFunction) => {
    const err = new Error('Not Found') as Error & { status?: number };
    err.status = 404;
    
    res.render('errors/404', err, (renderErr: any) => {
        if (renderErr) {
            console.error('Error rendering 404 page:', renderErr);
            res.status(404).send('Not Found');
        }
    });
});

//*************************************************
//           Server initialization
//*************************************************

// Initialize database connection with proper error handling
setTimeout(async () => {
    try {
        await db.init(config.databaseConfig);
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}, 5000);

// Initialize Redis connection
redisClient.connect().catch(error => {
    console.error('Failed to connect to Redis:', error);
});

app.listen(port, () => {
    console.log(`[${process.env.NODE_ENV}] Listening on http://localhost:${port}`);
});

//*************************************************
//           Event loop monitoring (development)
//*************************************************

if (process.env.NODE_ENV === 'development') {
    let lastLoop = Date.now();
    
    function monitorEventLoop() {
        const time = Date.now();
        const blocked = time - lastLoop;
        if (blocked > 1000) {
            console.error(`Event loop blocked for ${blocked}ms`);
        }
        lastLoop = time;
        setTimeout(monitorEventLoop, 200);
    }
    
    monitorEventLoop();
}
