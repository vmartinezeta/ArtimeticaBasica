import Divisibilidad from "./Divisibilidad.js"
import Fraccion from "./Fraccion.js"
import { Signo } from "./Signo.js"

function sumar(...fracciones) {
    return homogenizar(...fracciones).reduce((final, fraccion) => {
        if (final === null) {
            return new Fraccion(fraccion.signo, Signo.toInt(fraccion.signo) * fraccion.numerador, fraccion.denominador)
        } else if (typeof final === "object") {
            return new Fraccion(Signo.from(final, fraccion), final.numerador + Signo.toInt(fraccion.signo) * fraccion.numerador, fraccion.denominador)
        }
    }, null)
}

function homogenizar(...fracciones) {
    const divisibilidad = new Divisibilidad()
    const denominadores = fracciones.map(fraccion => fraccion.denominador)
    const mincm = divisibilidad.mincm(...denominadores).reduce((producto, factor) => producto * factor, 1)
    return fracciones.map(fraccion => {
        const nueva = fraccion.newInstance()
        const value = mincm / nueva.denominador
        nueva.numerador = nueva.numerador * value
        nueva.denominador = mincm
        return nueva
    })
}

// codigo boilerplate
const resultado = sumar(new Fraccion(Signo.MAS, 1, 3), new Fraccion("+", 4, 5), new Fraccion("-", 3, 10))
console.log(resultado.toString(), " = ", resultado.reducir().toString(), " = ", resultado.toDecimal())