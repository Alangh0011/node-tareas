const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [//Value es lo que regresa tipo string o otro tipo
            {
                value: '1',
                name: ` ${ '1.'.green } Crear Tarea `
            },
            {
                value: '2',
                name: ` ${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: ` ${ '3.'.green } Listar Tareas completadas`
            },
            {
                value: '4',
                name: ` ${ '4.'.green } Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: ` ${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: ` ${ '6.'.green } Borrar Tarea`
            },
            {
                value: '0',
                name: ` ${ '0.'.green } Salir\n`
            },
        ]
    }
];



const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white );
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}
const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}



const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i )=> {

        const idx = `${ i+ 1}`.green;

        return {
            value: tarea.id,
            name: `${ i+ 1} ${tarea.desc}`
        }
        

    });//map retorna un arreglo y los tranforma a hijos
    //tarea independiente y despues serian los nuevos arreglos como hijos 

    choices.unshift[{
        value: '0',
        bane: '0.'.green + 'Cancelar'
    }];

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];


    const { id } = await inquirer.prompt(preguntas);//el objeto se extrae opcion y guarda las opciiones (choices)
    
    return id;//retorna las opcines de id
}

const confirmar = async( mensaje ) => {

    const pregunta = [
        {
            type: 'confirm',// viene en la pagina 
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);//el ok es la respuesta de la pregunta
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i )=> {

        const idx = `${ i+ 1}`.green;

        return {
            value: tarea.id,//regresa
            name: `${ i+ 1} ${tarea.desc}`,//lo que se ve 
            checked: ( tarea.completadoEn ) ? true :  false //por puntos true y false
        }
        

    });//map retorna un arreglo y los tranforma a hijos
    //tarea independiente y despues serian los nuevos arreglos como hijos 

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];


    const { ids } = await inquirer.prompt(preguntas);//el objeto se extrae opcion y guarda las opciiones (choices)
    
    return ids;//retorna las opcines de id
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}