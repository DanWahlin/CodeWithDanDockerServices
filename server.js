'use strict';

// Third-party modules
const express = require('express');
const exphbs = require('express-handlebars');
const hbsHelpers = require('handlebars-helpers');
const hbsLayouts = require('handlebars-layouts');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const csurf = require('csurf');
const favicon = require('serve-favicon');
const merge = require('merge');
const router = require('express-convention-routes');

// Local modules
const customExpressHbsHelpers = require('./lib/hbsHelpers/expressHbsHelpers');
const db = require('./lib/database');
const redisClient = require('./lib/redisClient');
const productTypeRepository = require('./lib/productTypeRepository');
const config = require('./lib/configLoader');

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

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static(__dirname + '/public'));
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
app.use((req, res, next) => {
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

app.use((err, req, res, next) => {
    console.error('Application error:', err.stack);
    res.status(500).send({ message: err.message });
});

process.on('uncaughtException', (err) => {
    if (err) console.error('Uncaught exception:', err, err.stack);
});

//*************************************************
//           Graceful shutdown handlers
//*************************************************

if (process.platform === 'win32') {
    require('readline').createInterface({
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
app.use((req, res) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.render('errors/404', err);
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

