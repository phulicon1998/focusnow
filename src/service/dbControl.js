const low = require("lowdb");
const FS = require("lowdb/adapters/FileSync");

function initDb(){
    const adapter = new FS("db.json");
    const db = low(adapter);
    if(!db.has("block").value()){
        db.defaults({
            block: [],
            time: {
                work: 25,
                short: 5,
                long: 20,
                round: 4,
                onStart: false,
                minimize: false
            }
        }).write();
    }
    return db;
}

module.exports = initDb();
