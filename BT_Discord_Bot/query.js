module.exports.query = function(statement)
{
    return new Promise(function(resolve, reject) {
        let mysql = require('mysql');
        let conn = mysql.createConnection({
            host: '<host>',
            user: '<username>',
            password: '<password>',
            database: '<database>',
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