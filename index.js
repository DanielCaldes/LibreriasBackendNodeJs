require('dotenv').config();
const { ensureFile } = require('./src/utils');
const { DATA_DIR, TASKS_FILE, TASKS_INITIAL_DATA } = require('./src/config');
const app = require("./app");

const PORT = process.env.PORT || 3000;

async function runServer() {
    await ensureFile(DATA_DIR, TASKS_FILE, TASKS_INITIAL_DATA);

    app.listen(PORT, ()=>{
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
}

runServer();