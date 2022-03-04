const { get_now, insertar, consultar, editar, eliminar, total_reps } = require('./db_old.js')

const express = require('express')
const app = express()
app.use(express.static('static'))

app.get('/fecha', async(req, res) => {
    const now = await get_now()
    res.json(now)
})

app.post('/ejercicios', async(req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async() => {
        // primero desempaquetamos la respuesta
        const datos = Object.values(JSON.parse(body));
        // llamamos a la función insertar
        const algo = await insertar(datos[0], datos[1], datos[2], datos[3])
            //res.end(JSON.stringify(respuesta));
            // devolvemos "algo"
        res.status(201)
        res.send(algo)
    })
})

app.put('/ejercicios', async(req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async() => {
        // primero desempaquetamos la respuesta
        const datos = Object.values(JSON.parse(body));
        // llamamos a la función insertar
        const algo = await editar(datos[0], datos[1], datos[2], datos[3])
            //res.end(JSON.stringify(respuesta));
            // devolvemos "algo"
        res.send("Recurso editado con éxito")
    })
})

app.get('/ejercicios', async(req, res) => {
    const ejercicios = await consultar()
    res.send(JSON.stringify(ejercicios))
})

app.delete('/ejercicios', async(req, res) => {
    await eliminar(req.query.nombre)
    res.send('Eliminado')
})

app.get('/repeticiones', async(req, res) => {
    const total = await total_reps()
    res.send(`Hay en total ${total} repeticiones`)
});


app.listen(3000, () => console.log('Servidor en puerto 3000'))