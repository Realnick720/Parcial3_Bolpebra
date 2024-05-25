const exppress   = require('express');
const app        = exppress();
const port       = 3000;
const cors       = require('cors');
var   bodyParser = require('body-parser');

const router_persona      = require('./router/routerpersona');
const router_usuario      = require('./router/routerusuario');
const router_tipovehiculo = require('./router/routertipovehiculo');
const router_vehiculo     = require('./router/routervehiculo');
const router_curso        = require('./router/routercurso');
const router_inscripcion  = require('./router/routerinscripcion');
const router_notaventa    = require('./router/routernotaventa');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/persona', router_persona);
app.use('/usuario', router_usuario);
app.use('/tipovehiculo', router_tipovehiculo);
app.use('/vehiculo', router_vehiculo);
app.use('/curso', router_curso);
app.use('/inscripcion', router_inscripcion);
app.use('/notaventa', router_notaventa);

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));