const { readJson, writeJson } = require('../utils')
const { TASKS_FILE } = require('../config')
const { Mutex } = require('async-mutex');
const mutex = new Mutex();

exports.getTasks = async(req, res) =>{
    try{
        const tasks = await readJson(TASKS_FILE);
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(400).json({error: err})
    }
}

exports.getTaskById = async(req, res) =>{
    try{
        const tasks = await readJson(TASKS_FILE);
        const id = Number(req.params.id);

        const task = tasks.find(t=>t.id===id);

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json(task);
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.postTask = async(req, res) =>{
    try{
        const {title, description, limitDate, completed} = req.body;
        await mutex.runExclusive(async () => {
            const tasks = await readJson(TASKS_FILE);

            let id = 0;
            tasks.forEach(task => {
                if (task.id >= id) id = task.id + 1;
            });

            const task = { id, title, description, limitDate, completed };
            tasks.push(task);

            await writeJson(TASKS_FILE, tasks);

            res.status(200).json(task);
        });
    }
    catch(err){
        res.status(400).json({error: err})
    }
}

exports.updateTask = async(req, res) =>{
    try{
        const id = Number(req.params.id);
        const {title, description, limitDate, completed} = req.body;
        const tasks = await readJson(TASKS_FILE);

        const index = tasks.findIndex(t => t.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        tasks[index] = {id, title, description, limitDate, completed};

        await writeJson(TASKS_FILE, tasks);

        res.status(200).json(tasks[index]);
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.deleteTask = async(req, res) =>{
    try{
        const id = Number(req.params.id);
        const tasks = await readJson(TASKS_FILE);

        const task = tasks.find(t=>t.id===id);

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const newTasks = tasks.filter(t => t.id !== id);

        await writeJson(TASKS_FILE, newTasks);

        res.status(200).json({message:`Tarea /* ${task.title} */ (ID: ${task.id}) eliminada con éxito`});
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}