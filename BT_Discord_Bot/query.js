const host = process.argv[1];
const user = process.argv[2];
const password = process.argv[3];
const database = process.argv[4];

module.exports.query = function (statement)
{
    return new Promise(function(resolve, reject) {
        let mysql = require('mysql');
        let conn = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
            supportBigNumbers: true
        });

        conn.connect();
        conn.query(statement, (err, results, fields) => {
            if (err) return reject(err);
            return resolve(results);
        });

        conn.end();
    });
}