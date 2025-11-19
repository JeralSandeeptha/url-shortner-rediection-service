import './config/envConfig';
import express, { Application } from 'express';
import cors from 'cors';
import logger from "./utils/logger";
import cookieParser from 'cookie-parser';
import './config/dbConfig';

//import routes
import appRoute from "./api/routes/app.route";
import redirectRoute from "./api/routes/redirect.route";

const app: Application = express();
const PORT = process.env.PORT || 5003;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', appRoute);
app.use('/api/v1/redirect', redirectRoute);

// start application
app.listen(PORT, () => {
    console.log(`Redirect Service is running on port ${PORT}`);
    logger.info(`Redirect Service is running on port ${PORT}`);
});

export default app;