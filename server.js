const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let anotacoes = [
    { id: 0, texto: "Sou uma anotação"}
];

let ultimoId = 1;

app.get('/anotacoes', (req, res) => {
    res.json(anotacoes);
});

app.post('/anotacoes', (req, res) => {
    ultimoId++;
    anotacoes.push({ id: ultimoId, texto: req.body.texto });
    res.json({info: "Anotação criada com sucesso!"});
});

app.delete('/anotacoes/:id', (req, res) => {
    anotacoes = anotacoes.filter(({id}) => id != +req.params.id);
    res.json({
        info: `Anotação de id: ${req.params.id} deletada com sucesso!`
    });
});

const port = 5500;
const host = "0.0.0.0";

app.listen(port, host, () => {
    console.log(`Servidor inicializado em http://${host}:${port}`);
});