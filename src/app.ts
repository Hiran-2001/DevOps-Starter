import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import logger from './utils/logger';
import itemRoutes from './routes/item.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Health check
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Connect to MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
    
    // Start server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

export default app;