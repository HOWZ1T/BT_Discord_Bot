module.exports.query = function(statement)
{
    return new Promise(function(resolve, reject) {
        let mysql = require('mysql');
        let conn = mysql.createConnection({
            host: 'bt-db.crct0tfc5f4g.ap-southeast-2.rds.amazonaws.com',
            user: 'bt',
            password: '',
            database: 'galactic',
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