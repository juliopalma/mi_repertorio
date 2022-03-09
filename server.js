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

        try {
            const inst = await insertar(datos[0], datos[1], datos[2])
            res.send(inst)
        } catch (error) {
            res.status(201)
        }

    })
})

//Consultar
app.get('/canciones', async(req, res) => {
    try {
        let canciones = await consultar();
        res.json(canciones);
    } catch (error) {
        console.log("Error al realizar la consulta");
    }
});

//Actualizar
app.put("/cancion", async(req, res) => {
    let body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", async() => {
        try {
            const datos = Object.values(JSON.parse(body));
            const act = await editar(Number(datos[0]), datos[1], datos[2], datos[3]);
            res.status(201).json(act);
        } catch (error) {
            console.log("El error ha sido el siguinete: " + error)
        }
    });
});

//Eliminar
app.delete('/cancion', async(req, res) => {
    try {
        await eliminar(req.query.id);
        res.send('Cancion eliminada de forma satisfactoria');
    } catch (error) {
        console.log("El error producido es el siguiente: " + error);
    }
});

app.listen(3000, () => console.log("Ejecutando el el puerto 3000"))