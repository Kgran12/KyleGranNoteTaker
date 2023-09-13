const express = require('express');
const fs = require('fs');
const routesApi = require('./routes/api-routes');
const routesHtml = require('./routes/html-routes');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', routesApi);
app.use('/', routesHtml);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
}
);



