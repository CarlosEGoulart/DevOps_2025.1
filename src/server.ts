// server.ts ou index.ts
import express from 'express';
import { router } from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('src/view/interface')); // serve HTML/CSS/JS

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
