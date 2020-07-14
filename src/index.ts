import express from 'express';
import bodyParser from 'body-parser';

import 'src/config';
import 'src/service';

import { transactionRouter } from 'src/router/transaction';
import { accountRouter } from 'src/router/account';
import { utilRouter } from 'src/router/util';
import { webhookRouter } from 'src/router/webhook';
import { blockRouter } from 'src/router/block';
import { systemRouter } from 'src/router/system';
import { blockchainRouter } from 'src/router/blockchain';
import { delegateRouter } from "src/router/delegate";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/transactions', transactionRouter);
app.use('/api/blocks', blockRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/utils', utilRouter);
app.use('/api/webhook', webhookRouter);
app.use('/api/blockchain', blockchainRouter);
app.use('/api/system', systemRouter);
app.use('/api/delegate',delegateRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`[DDK][RestAPI] Listening on port ${process.env.SERVER_PORT}!`);
});
