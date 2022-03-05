const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'repertorio',
    password: '1234',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

//Insertar
async function insertar(cancion, artista, tono) {
    let client;
    try {
        client = await pool.connect()
    } catch (err) {
        console.log("El error es el siguiente: " + err);
        return;
    }

    const res = await client.query(
        "insert into repertorio (cancion, artista, tono) values ($1, $2, $3) returning *", [cancion, artista, tono]
    )
    client.release()

}

//Consultar
async function consultar() {
    let client
    try {
        client = await pool.connect();

    } catch (conn_error) {

        console.log("Error en el cliente");
        return;
    }

    let res = await client.query({ text: `select * from repertorio` });

    client.release();

    return res.rows;
};

//Editar
async function editar(id, cancion, artista, tono) {
    let client
    try {
        client = await pool.connect();

    } catch (conn_error) {

        console.log("Error en el cliente");
        return;
    }

    let res;

    res = await client.query({
        text: "update repertorio set cancion=$2, artista=$3, tono=$4 where id=$1",
        values: [id, cancion, artista, tono]
    });

    client.release();

    return res.rows;
};

//Eliminar
async function eliminar(id) {
    const client = await pool.connect()
    const res = await client.query(
        "delete from repertorio where id=$1", [id]
    )
    client.release()
    return res.rows

}

module.exports = { insertar, consultar, editar, eliminar }