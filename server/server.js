const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;
const pgRouter = require('./routes/pgRoute');
const mySQLRouter = require('./routes/mySQLRoute');
const schema = require('./dummy_server/schema');

const app = express();
const PORT = process.env.PORT || 8081;

/* Express logic/handler */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../build')));

app.use('/db/pg', pgRouter);
app.use('/db/mySQL', mySQLRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'An error occured in unknown middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, ...err };
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`lucidQL is ready at: http://localhost:${PORT}`));

module.exports = app;
