import colors from 'colors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './database/connectDb.js';
import transactions from './routes/transactionsRouter.js';
import path from 'path';

// CONFIG
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;
const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000/' }));
app.use(express.json());
connectDb();

// ROUTES
app.use('/api/v1/transactions', transactions);

// PROD
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// ENTRYPOINT
app.listen(PORT, () => {
  console.log(`API_SERVER: ${PORT} / ${process.env.NODE_ENV} mode`.blue.bold);
});
