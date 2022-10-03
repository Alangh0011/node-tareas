//INTERACIONES DE LLER Y GRABAR 
const fs = require('fs');

const archivo = './db/data.json';//guardar en tipo JSON

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify( data ) );//JSON
    //objeto a JSON en data, es funcion de JS

}

const leerDB = () => {

    if( !fs.existsSync(archivo) ){//verificar si existe el archivo
        return null;//si no existe
    }
    //Si existe 

    const info = fs.readFileSync( archivo, { encoding: 'utf-8'} )
    const data = JSON.parse( info );//para que no se vea como string
    //si no como el objeto

    console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}