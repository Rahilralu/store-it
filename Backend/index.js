import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js'; // import router

const PORT = process.env.PORT || 8000;


const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use('/api', routes);
app.get('/', (req,res) => res.send('Backend running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
