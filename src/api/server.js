const app = require('./app');
const error = require('../middlewares/error');

const PORT = 3000;

app.use(error);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
