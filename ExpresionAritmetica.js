// Autor: Víctor Martínez

import Compuesto from "./Compuesto.js"
import Divisibilidad from "./Divisibilidad.js"
import Fraccion from "./Fraccion.js"
import { Signo } from "./Signo.js"


export default class ExpresionAritmetica {
    constructor() {
        this.compuestos = []
        this.fracciones = []
    }

    agregar(termino) {
        if (termino instanceof Compuesto) {
            this.compuestos.push(termino)
            return this
        } else if (termino instanceof Fraccion) {
            this.fracciones.push(termino)
            return this
        }
    }

    eliminarParentesis() {
        this.compuestos = this.compuestos.map(c => c.reducir())

        for (let compuesto of this.compuestos) {
            const externo = compuesto.signo
            const [reducida] = compuesto.fracciones
            const interno = reducida.signo
            const numero = Signo.toInt(externo) * Signo.toInt(interno)
            const fraccion = new Fraccion(Signo.fromInt(numero), reducida.numerador, reducida.denominador)
            this.fracciones.push(fraccion)
        }
    }

    simplificar() {
        this.eliminarParentesis()
        return this.sumar(...this.fracciones)
    }

    sumar(...fracciones) {
        return this.homogenizar(...fracciones).reduce((final, fraccion) => {
            if (final === null) {
                return new Fraccion(fraccion.signo, Signo.toInt(fraccion.signo) * fraccion.numerador, fraccion.denominador)
            } else if (typeof final === "object") {
                return new Fraccion(Signo.from(final, fraccion), final.numerador + Signo.toInt(fraccion.signo) * fraccion.numerador, fraccion.denominador)
            }
        }, null)
    }    

    homogenizar(...fracciones) {
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

}