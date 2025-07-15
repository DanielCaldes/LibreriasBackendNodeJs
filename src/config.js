const path = require('node:path')
const {getDateAfterDays} = require('./utils')

const DATA_DIR = process.env.DATA_DIR;
const TASKS_FILE = path.join(DATA_DIR,"tasks.json");
const TASKS_INITIAL_DATA = [
    {
        id: 0,
        title: "Tarea predeterminada para mañana",
        description: "Esta es una tarea predeterminada creada dinamicamente al crear el archivo tasks.json",
        limitDate: getDateAfterDays(1),
        completed: false
    },
    {
        id: 1,
        title: "Tarea predeterminada de ayer",
        description: "Esta es una tarea predeterminada creada dinamicamente al crear el archivo tasks.json",
        limitDate: getDateAfterDays(-1),
        completed: true
    }
];

module.exports = {
  DATA_DIR, TASKS_FILE, TASKS_INITIAL_DATA
};