const sql = require('mysql');

const connection = sql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});

module.exports = {


    // sql connect
    sql_connect: (path,param_data,response) => {

        connection.connect();

        switch(path) {
            case 'list_data':
                let sql = 'SELECT * from my_db.users';
                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    console.log('results ==>', results);
                    response.write(results);
                    response.end();
                });
                break;

            case 'insert_data':
                let post  = {id: param_data.id,name: param_data.name,,email: param_data.email};
                let sql = 'INSERT INTO my_db.users SET ?';
                connection.query(sql, post, function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                });
                break;

            case 'update_data':
                let post  = {param_data.name,param_data.id};
                let sql = 'UPDATE my_db.users SET name = ? WHERE id = ?';
                // UPDATE posts SET modified = CURRENT_TIMESTAMP() WHERE id = 42
                connection.query(sql, post, function (error, results, fields) {
                    if (error) throw error;
                });
                break;

            case 'delete_data':
                let sql = "DELETE from trn_employee WHERE employee_id = ?";
                connection.query(sql, [param_data.id], function(err, result) {
                    if (error) throw error;
                });

                break;
        }


        connection.end();

    }

};