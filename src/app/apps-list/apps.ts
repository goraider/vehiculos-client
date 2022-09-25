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
    { name:"Usuarios",      route: "usuarios",          icon: "assets/icons/catalogo-users.svg",            permission:"" },
    { name:"Vehículos",     route: "vehiculos",         icon: "assets/icons/car.svg",              permission:"" },
    
    { name:'Catálogos', route: "catalogos",  icon: "assets/icons/catalogs.svg", isHub:true, hideHome:true, 
      children:[
        {name:'Marcas',route:'catalogos/marcas', icon:'copyright'},
        {name:'Colores',route:'catalogos/colores', icon:'invert_colors'}
      ],
    }
]