const express = require('express');
const { Router } = express;
const apiRouter = Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  apiRouter.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
}

// if (process.env.NODE_ENV === 'production') {
//   apiRouter.use(
//     cors({ credentials: true, origin: 'https://res-lab.vercel.app' })
//   );
// }

apiRouter.use(express.json());
apiRouter.use(cookieParser());
apiRouter.use(bodyParser.json());

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

apiRouter.use('/', require('./uploadRoutes'));

module.exports = apiRouter;
