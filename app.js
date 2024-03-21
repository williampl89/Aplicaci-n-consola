import colors from 'colors';
import {inquirerMenu, pausa, leerInput, ListadoTareasBorrar,confirmar, mostrarListadoChecklist} from './helpers/inquirer.js';
import {guardarDB, leerDB} from './helpers/guardarArchivo.js';

//import Tarea from './models/tarea.js';
import Tareas from './models/tareas.js';

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){ //Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1': //crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;

            case '2': //listar opciones
                tareas.listadoCompleto();
            break;

            case '3': //listar tareas completadas
                tareas.listadoPendientesCompletadas(true);
            break;

            case '4': //listar tareas pendientes
                tareas.listadoPendientesCompletadas(false);
            break;

            case '5': //marcar tareas pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                //console.log(ids);
            break;

            case '6': //borrar
                const id = await ListadoTareasBorrar(tareas.listadoArr);
                //console.log({id});
                if(id !== '0'){
                    const ok = await confirmar('Esta seguro?'); //preguntar si esta seguro de eliminar item

                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }

                
            break;

            
        }
         
        guardarDB(tareas.listadoArr);
        await pausa();
        
    } while ( opt !== '0');


}

main();