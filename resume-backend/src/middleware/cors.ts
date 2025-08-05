import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3005',
    process.env['FRONTEND_URL']
  ].filter((url): url is string => Boolean(url)),
  credentials: true,
  optionsSuccessStatus: 200
};

export const corsMiddleware = cors(corsOptions); 