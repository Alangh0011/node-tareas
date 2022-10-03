require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');//destructuracion de paquetes
//como son los objetos entre {}
const Tareas = require('./models/tareas');//importanto lo que ya exporto

//async es una promesa esperar que se cumpla con el await 
//se van encolando, es decir que espera a que se complete
 
const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();//aqui se almacena la BD en tareasBD

    if ( tareasDB ) { // cargar tareas, si es true lo que regreso
        //si el archivo existe 
        tareas.cargarTareasFromArray( tareasDB );//manda la BD 
        //a la funcion de tareas, que ahi esta el metodo cargar 
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                tareas.listadoCompleto();
            break;
            
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );//manda en arreglo las tareas
                tareas.toggleCompletadas( ids );
            break;
                       
            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );// manda todas las tareas del BD a borrar, el await es para que espere y termine 
                //preguntar si esta seguro de borrar
                if ( id !== '0' ) {//si la opcion es diferente de cero entra
                    const ok = await confirmar('¿Está seguro?');//
                    if ( ok ) {//si es true 
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        
        }


        guardarDB( tareas.listadoArr );//asi graba en BD los 
        //cambios, las listas

        await pausa();

    } while( opt !== '0' );


    // pausa();

}


main();