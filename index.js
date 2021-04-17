import express from 'express';
import cors from 'cors';
import routes from './routes';
import { port } from './config';

const app = express();

app.use(cors());
// const corsOptions = {
//   origin: 'http://localhost:3001',
//   optionsSuccessStatus: 200 // For legacy browser support
// }

// app.use(cors(corsOptions));
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
