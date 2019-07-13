const low = require("lowdb");
const FS = require("lowdb/adapters/FileSync");

function initDb(){
    const adapter = new FS("db.json");
    const db = low(adapter);
    if(!db.has("time").value()){
        db.defaults({
            site: [],
            time: {
                work: 25,
                short: 5,
                long: 20,
                round: 4
            },
            option: {
                onStart: false,
                minimize: false
            }
        }).write();
    }
    return db;
}

module.exports = initDb();
