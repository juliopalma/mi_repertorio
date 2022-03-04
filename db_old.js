//import pg from 'pg'
const { Pool } = require('pg')

// creamos nuestro pool de conexiones
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'always_music',
    password: '1234',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

async function get_now() {
    const client = await pool.connect()
    const res = await client.query('select now()')
    client.release()
    return res.rows
}

async function insertar(nombre, series, repeticiones, descanso) {
    const client = await pool.connect()
        // ejemplo de consulta con 2 parámetros
    const res = await client.query(
        "insert into ejercicios (nombre, series, repeticiones, descanso) values ($1, $2, $3, $4) returning *", [nombre, series, repeticiones, descanso]
    )
    client.release()
}

async function consultar() {
    const client = await pool.connect()
    const res = await client.query(
        "select * from ejercicios"
    )
    client.release()
    return res
}

async function editar(nombre, series, repeticiones, descanso) {
    const client = await pool.connect()
        // ejemplo de consulta pasándole como parámetro 1 objeto
    const res = await client.query({
        text: "update ejercicios set series=$2, repeticiones=$3, descanso=$4 where nombre=$1",
        values: [nombre, series, repeticiones, descanso]
    })

    client.release()
    return res
}

async function eliminar(nombre) {
    const client = await pool.connect()
        // ejemplo de consulta con 2 parámetros
    const res = await client.query(
        "delete from ejercicios where nombre=$1", [nombre]
    )
    client.release()
}

async function total_reps() {
    const ejercicios = await consultar()
    let total = 0
    for (let ejercicio of ejercicios.rows) {
        total += parseInt(ejercicio.repeticiones)
    }
    return total
}

module.exports = { get_now, insertar, consultar, editar, eliminar, total_reps }