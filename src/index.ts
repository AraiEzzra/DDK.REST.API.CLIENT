import express from 'express';
import bodyParser from 'body-parser';

import 'src/config';
import 'src/service';
import { transactionRouter } from 'src/router/transaction';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/transactions', transactionRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`DDK RestAPI listening on port ${process.env.SERVER_PORT}!`);
});
