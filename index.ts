import { MongoClient, ObjectId } from 'mongodb';
const conexion = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import{Paciente} from './models/paciente';
import { PacienteController } from './controllers/paciente-controller';
import { MedicoController } from './controllers/medico-controller';
import { DeterminacionesController } from './controllers/determinaciones-controller';
import { EspecialidadesController} from './controllers/especialidades-controller';
const app = express();
app.use(bodyparser.json());
const port = 4000;
app.get('/',async(req:Request,res:Response)=>{
    res.send('funcionando laboratorio clinico backend')
});
const bd='analisis-clinicos';
const coleccion='pacientes';
const pacientesController=new PacienteController(conexion,bd);
   
app.delete('/pacientes/:_id',pacientesController.Borrar);
app.post('/pacientes',pacientesController.Crear);        
app.get('/pacientes',pacientesController.Listarpacientes);

const medicoController=new MedicoController(conexion,bd);
app.delete('/medico/:_id',medicoController.Borrar);
app.post('/medico',medicoController.Cargar);
app.get('/medico',medicoController.Listarmedicos);

const determinacionescontroller=new DeterminacionesController(conexion,bd);
app.delete('/determinaciones/:_id',determinacionescontroller.Borrar);
app.post('/determinaciones',determinacionescontroller.Cargar);
app.get('/determinaciones',determinacionescontroller.Listardeterminaciones);
app.put('/determinaciones/:_id',determinacionescontroller.Modificar);

const especialidadescontroller=new EspecialidadesController(conexion,bd);
app.delete('/especialidad/:_id', especialidadescontroller.Borrar);
app.post('/especialidad', especialidadescontroller.Cargar);
app.get('/especialidad',especialidadescontroller.Listarespecialidades);
app.put('/especialidad/:_id',especialidadescontroller.Modificar);



conexion.connect().then(async()=>{
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });
})