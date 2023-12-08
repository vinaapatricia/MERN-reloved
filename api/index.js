import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  // const __dirname = path.resolve();

const app = express();

app.use(cors(
  {
    origin: ["https://mern-preloved-vinaapatricia.vercel.app/"],
    methods: ["POST","GET"],
    credentials: true
  }
));

app.use(express.json());

app.use(cookieParser());

app.listen(8080, () => {
    console.log('Server is running on port 8080!');
  });

  app.get("/", (req, res) => {
    res.json("hi");
  });

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use(( err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || '500 : Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
