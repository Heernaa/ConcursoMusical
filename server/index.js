import express from 'express';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const app = express()
app.use(express.json())
const port = 3000

const RUTA = fileURLToPath(new URL('../src/data/ranking.json', import.meta.url))

async function leerRanking() {
  return JSON.parse(await readFile(RUTA, 'utf8'))
}

app.get('/api/ranking', async (req, res) => {
  const top = (await leerRanking()).sort((a, b) => b.puntos - a.puntos).slice(0, 10)
  res.json(top)
})

app.post('/api/ranking', async (req, res) => {
  const { nombre, aciertos, tiempo, puntos } = req.body ?? {};
  if (typeof nombre !== 'string' || !nombre.trim() || !Number.isInteger(aciertos) || !Number.isInteger(tiempo) || !Number.isInteger(puntos)) {
    return res.status(400).json({error: 'Datos inválidos'})
  }
  const ranking = await leerRanking();
  const entrada = { nombre: nombre.trim(), aciertos: aciertos, tiempo: tiempo, puntos: puntos }
  ranking.push(entrada)

  const posicion = [...ranking].sort((a,b) => b.puntos - a.puntos).indexOf(entrada) + 1;


  await writeFile(RUTA, JSON.stringify(ranking, null, 2))
  res.status(201).json({...entrada, posicion})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
