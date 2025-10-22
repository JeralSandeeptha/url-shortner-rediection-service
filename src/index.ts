import './config/envConfig';
import express, { Application } from 'express';
import cors from 'cors';
import logger from "./utils/logger";
import './config/dbConfig';

//import routes
import appRoute from "./api/routes/app.route";

const app: Application = express();
const PORT = process.env.PORT || 5003;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', appRoute);

// start application
app.listen(PORT, () => {
    console.log(`Redirect Service is running on port ${PORT}`);
    logger.info(`Redirect Service is running on port ${PORT}`);
});

export default app;