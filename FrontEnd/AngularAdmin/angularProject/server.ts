//import 'zone.js/node';
//import express from 'express';
//import { join } from 'path';

//import AppServerModule from './src/main.server';

//export function app(): express.Express {
//  const server = express();
//  const distFolder = join(process.cwd(), 'dist/angular-project/browser');
//  const indexHtml = 'index.html';

 

//  server.set('view engine', 'html');
//  server.set('views', distFolder);

//  // Serve static files
//  server.get('*.*', express.static(distFolder, {
//    maxAge: '1y'
//  }));

//  // All regular routes use the Angular Universal engine
//  server.get('*', (req, res) => {
//    res.render(indexHtml, { req });
//  });

//  return server;
//}

//function run(): void {
//  const port = process.env['PORT'] || 4000;

//  const server = app();
//  server.listen(port, () => {
//    console.log(`Node Express server listening on http://localhost:${port}`);
//  });
//}

//run();
/*********************************************************************
 * Angular Universal Express Server
 *********************************************************************/

import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/angular-project/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';



  server.set('view engine', 'html');
  server.set('views', distFolder);

  // קבצים סטטיים (CSS, JS, תמונות)
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // כל בקשה אחרת מופנית לאנגולר
  server.get('*', (req, res) => {
    res.render(indexHtml, { req });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`✅ Node Express server listening on http://localhost:${port}`);
  });
}

// אם קובץ זה הוא הקובץ שמורץ (main), נריץ את הפונקציה run()
if (require.main === module) {
  run();
}

export * from './src/main.server';
