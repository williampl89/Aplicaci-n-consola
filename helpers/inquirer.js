import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.red} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.red} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.red} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.red} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.red} Eliminar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`
            }
        ]
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('=============================='.red);
    console.log('    Seleccione una opcion '.white);
    console.log('==============================\n'.red);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async() =>{
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para continuar`,
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async(message) =>{
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const ListadoTareasBorrar = async(tareas = []) =>{
    const choices = tareas.map( (tarea, i) =>{

        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
    /*
    {
                value: '1',
                name: `${'1.'.red} Crear tarea`
            }
    */
}


const mostrarListadoChecklist = async(tareas = []) =>{

    const choices = tareas.map( (tarea, i) =>{

        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;

}

const confirmar = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

export {inquirerMenu, pausa, leerInput, ListadoTareasBorrar, confirmar, mostrarListadoChecklist};