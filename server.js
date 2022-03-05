const express = require('express');
const { consultar, editar, eliminar, insertar } = require('./db.js');
const app = express();
app.use(express.static('static'));

//Insertar
app.post('/cancion', async(req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })
    req.on("end", async() => {

        const datos = Object.values(JSON.parse(body));

        const inst = await insertar(datos[0], datos[1], datos[2])

        res.status(201)

        res.send(inst)
    })
})

//Consultar
app.get('/canciones', async(req, res) => {
    let canciones = await consultar();
    res.json(canciones);
});

//Actualizar
app.put("/cancion", async(req, res) => {
    let body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", async() => {
        const datos = Object.values(JSON.parse(body));
        const act = await editar(Number(datos[0]), datos[1], datos[2], datos[3]);
        res.status(201).json(act);
    });
});

//Eliminar
app.delete('/cancion', async(req, res) => {
    await eliminar(req.query.id);

    res.send('Cancion eliminada de forma satisfactoria')
});

app.listen(3000, () => console.log("Ejecutando el el puerto 3000"))