import * as express from 'express';
import { getConfigurationByIndex } from './configuration';
import { getItemByIndex } from './items';

const app = express();

app.get('/configuration.json', (req, res) => {
  const start = Number(req.query.start);
  const pageSize = Number(req.query.pageSize);
  const data = getConfigurationByIndex(start, pageSize);

  res.send({
    status: 200,
    ...data,
  });
});

app.get('/item.json', (req, res) => {
  const start = Number(req.query.start);
  const pageSize = Number(req.query.pageSize);
  const data = getItemByIndex(start, pageSize);

  res.send({
    status: 200,
    ...data,
  });
});

app.listen(3000, () => {
  console.log('Server Listening on PORT:', 3000);
});
