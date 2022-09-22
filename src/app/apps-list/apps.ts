export class App {
    name:string;
    route: string;
    icon: string;
    permission?: string; //Si tiene permisos se motrara/oculatara dependiendo de los permisos que el usuario tenga asignado
    hideHome?:boolean; //Si es verdadero ocultara el elemento que dirige a raiz, en la lista que aparece en los modulos con hijos (la raiz es la ruta de la aplicación padre)
    isHub?:boolean; //Si es verdadero solo mostrara la aplicación en el HUB cuando tenga al menos un hijo activo, de lo contario se ocultara, si es falso siempre estara presente en el HUB (tomando encuenta los permisos asignados) sin importar si tiene hijos o no activos
    children?:App[]; //Lista de modulos y componentes hijos de la aplicación
    apps?:App[]; //Hub secundario de apps
}

export const APPS:App [] = [
    { name:"Usuarios",      route: "usuarios",          icon: "assets/icons/users.svg",              permission:"" },
    { name:"Vehículos",     route: "vehiculos",          icon: "assets/icons/car.svg",              permission:"" },
    
    { name:'Herramientas Dev', route: "dev-tools",  icon: "assets/icons/toolbox.svg", isHub:true, hideHome:true, 
      children:[
        {name:'Reportes MySQL',route:'dev-tools/mysql-reportes', icon:'insert_drive_file', permission:"6ARHQGj1N8YPkr02DY04K1Zy7HjIdDcj"}
      ],
    },
    /*
    { name:'Pedidos',   route: "pedidos",       icon: "assets/icons/pedidos-hub.svg",
      apps:[
        { name:'Pedidos Ordinarios',        route: "pedidos/pedidos-ordinarios",        icon: "assets/icons/pedidos.svg" },
        { name:'Recepción de Pedidos',      route: "pedidos/recepcion-pedidos",         icon: "assets/icons/recepcion-pedidos.svg" },
      ]
    },
    { name:'Catalogos',   route: "catalogos",       icon: "assets/icons/catalogos.svg",
      apps:[
        { name:'Almacenes',        route: "catalogos/almacenes",        icon: "assets/icons/catalogo-almacenes.svg" },
        { name:'Grupos',           route: "catalogos/grupos",           icon: "assets/icons/catalogo-grupos.svg" },
      ]
    },
    
    { name: "Seguridad", route: "seguridad", icon: "assets/icons/security-shield.svg", 
        children: [
            {name:'Permisos',route:'permisos',icon:'lock', permission:"RGMUpFAiRuv7UFoJroHP6CtvmpoFlQXl"},
            {name:'Roles',route:'roles',icon:'people_alt', permission:"nrPqEhq2TX0mI7qT7glaOCJ7Iqx2QtPs"}
        ] 
    },*/
    //{ name: "Viáticos", route: "configuracion", icon: "assets/icons/travel-expenses.png" },
    //{ name: "Herramientas", route: "herramientas", icon: "assets/icons/toolbox.svg" },    
    //{ name: "Configuración", route: "configuracion", icon: "assets/icons/settings.svg" },8QnE1cYkjjNAmM7qHSf1CSlPMJiQeqr5
]