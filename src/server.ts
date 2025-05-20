// server.ts
import express from 'express';
import path from 'path';
import { router } from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', router); // <-- API primeiro!
app.use(express.static(path.resolve(__dirname, 'view/interface')));

// Redireciona '/' para 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view/interface/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
