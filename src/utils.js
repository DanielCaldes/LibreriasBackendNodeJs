const fs = require('fs').promises;

async function ensureFile(dataDir, file, defaultValue){
    try{
        await fs.access(file);
    }catch(err){
        await fs.mkdir(dataDir, {recursive:true})
        await fs.writeFile(file, JSON.stringify(defaultValue, null, 2))
    }
}

const readJson = async (f) => JSON.parse(await fs.readFile(f, "utf-8"));
const writeJson = async (f,d) => fs.writeFile(f, JSON.stringify(d,null,2));

function getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

module.exports = { ensureFile, readJson, writeJson, getDateAfterDays }