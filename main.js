// Autor: Víctor Martínez
import Compuesto from "./Compuesto.js"
import ExpresionAritmetica from "./ExpresionAritmetica.js"
import Fraccion from "./Fraccion.js"
import { Signo } from "./Signo.js"


const expresion = new ExpresionAritmetica()
expresion.agregar(new Compuesto(Signo.MAS, new Fraccion(Signo.MAS, 2, 5), new Fraccion(Signo.MAS, 1, 3)))
expresion.agregar(new Compuesto(Signo.MENOS, new Fraccion(Signo.MAS, 1, 2), new Fraccion(Signo.MENOS, 1, 5)))
const fraccion = expresion.simplificar()
console.log(fraccion.toString(), " = ", fraccion.toDecimal())