const Tarea = require('./tarea');

/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Tareas {

    _listado = {
        'abc': 123
    };


    get listadoArr() {//vamos a tomar el objeto que esta compuesto 
        //por llaves a un arreglo
        //get para retornar un nuevo arreglo

        const listado = [];//array
        Object.keys(this._listado).forEach( key => {//extrae las llaves 
            //y regresa un arreglo por cada lleva que encuentra

            const tarea = this._listado[key];
            listado.push( tarea );//las añade al listado (arreglo)
        });

        return listado;//retornando arreglo
    }


    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {// RECIBE ID 

        if ( this._listado[id] ) {//existe el id 
            delete this._listado[id];//si existe, borremos 
        }

    }

    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;//extraer tarea.id
            //tarea se iguala que es el arreglo que recibe
        });
    }


    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);//guarda el listado, con 
        //la descripcion
        this._listado[tarea.id] = tarea;//extrae el id, y
        //ahi guarda la tarea(descripcion)
    }

    listadoCompleto() {//listarlo 
        
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
//busca el id de listadoArr(metodo), i=indice, tarea es todo 
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;//destructura tarea en desc y comple
            const estado = ( completadoEn ) //si es diferente
                                ? 'Completada'.green//true
                                : 'Pendiente'.red;//false

            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });         
    }

    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                // mostrar completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                // mostrar pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }

        });     

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {//significa que si hay un id y lo busca 

            const tarea = this._listado[id];//extrae el id de la lista y jala el objeto completo
            if ( !tarea.completadoEn ) {//si es null significa que no se completo 
                tarea.completadoEn = new Date().toISOString()//le da una fecha de completada
            }

        });

        this.listadoArr.forEach( tarea => {//barrer las llaves 

            if ( !ids.includes(tarea.id) ) {//si el id de esta tarea no esta ahi, si no existe lo limpia
                //si en el arrego de id incluye la tarea.id que se encunetra registrada, si no viene en el arreglo la limpia
                this._listado[tarea.id].completadoEn = null;//es decir que lo manda a null 
            }

        });


    }

}



module.exports = Tareas;
