import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5174',    // Local development
    'http://localhost:5173',
    'http://localhost:5175',    // Alternative local port
      // Alternative local port  
            // Alternative local port
    'https://yangad-s-art-gallery.onrender.com',
    'https://admin-yangad-s-art-gallery.onrender.com',  // Production frontend
           
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};
app.use(cors(corsOptions));
app.use('/products', productRoutes);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/offers', offerRoutes);  
app.use('/orders', orderRoutes);
app.use('/analytics', analyticsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send({ message: 'YangArt backend running' });
});

app.get('/ping', (req, res) => {
  res.send({ message: 'Pong' });
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
