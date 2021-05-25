// obtener la diferencia de años

export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

    // monto segun la marca 
export function calcularMarca(marca) {
    let incremento;

    switch(marca){
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'asiatico':
            incremento = 1.05
            break;
        default: 
            break;
    }

    return incremento;
}

// calcula el tipo de seguro 
export function obtenerPlan( plan ) {
    return (plan === 'basico') ? 1.20 : 1.50;
}

export function primerMayus( t ){
    return t.charAt(0).toUpperCase() + t.slice(1);
}