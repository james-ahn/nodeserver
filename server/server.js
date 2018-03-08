const sql = require('mysql');
const http = require('http');
const url = require('url');
const db_pool = require('./db_pool');

let con = new con_server();


/*
*   1. create server
*   2. get the parameter from client
*   3. separate each table.
*
* */
function con_server () {

    // requst post
    http.createServer((request, response) => {

        let parsedUrl = url.parse(request.url);
        let resource = parsedUrl.pathname;

        console.log('resource',resource);

        let postdata = '';
        let parsedQuery = '';

        request.on('error', (err) => {
            console.error('err',err);
        }).on('data',(data) => {
            postdata = postdata + data;
            parsedQuery = JSON.parse(postdata);

        }).on('end', () => {

            // success header and data add => response client.
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.writeHead(200, {'Content-Type':'text/html'});

            let param_data = parsedQuery.data[0];

            console.log('param_data',param_data);

            switch(resource) {
                case '/list_data':
                    db_pool.sql_connect('list_data',param_data,response);
                    break;
                case '/insert_data':
                    db_pool.sql_connect('insert_data',param_data,response);
                    break;
                case '/update_data':
                    db_pool.sql_connect('update_data',param_data,response);
                    break;
                case '/delete_data':
                    db_pool.sql_connect('delete_data',param_data,response);
                    break;
            }

        });

    }).listen(8080, () => {
            console.log('Server is running...');
    });

}
