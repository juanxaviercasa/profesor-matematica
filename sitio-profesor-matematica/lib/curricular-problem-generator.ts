/**
 * Ejercicios vinculados a unidades de Álgebra Lineal y Física.
 * Datos sencillos, propiedades demostrables y unidades explícitas.
 * Los bancos extraídos del libro permanecen intactos.
 */
import type { FocusedProblem } from "./focused-problem-generator";

export const CURRICULAR_PROBLEM_SLUGS = [
  "eliminacion-gauss-jordan-y-rango",
  "espacios-vectoriales-bases-y-dimension",
  "cambio-de-base-y-matriz-de-transicion",
  "transformaciones-lineales-nucleo-e-imagen",
  "producto-interno-y-gram-schmidt",
  "autovalores-autovectores-y-diagonalizacion",
  "diagonalizacion-y-cayley-hamilton",
  "diagonalizacion-ortogonal-y-svd",
  "analisis-dimensional-y-vectores",
  "cinematica-mru-mruv-y-caida-libre",
  "cinematica-velocidad-y-aceleracion-instantanea",
  "estatica-equilibrio-y-torque",
  "leyes-de-newton-y-diagrama-de-cuerpo-libre",
  "gravitacion-universal-y-leyes-de-kepler",
  "trabajo-mecanico-y-potencia",
  "trabajo-energia-mecanica-y-conservacion",
  "cantidad-de-movimiento-impulso-y-choques",
  "movimiento-armonico-simple-y-frecuencia",
  "hidrostatica-pascal-y-arquimedes",
  "calorimetria-y-termodinamica",
  "electrostatica-campo-electrico-y-circuitos",
  "electrodinamica-y-electromagnetismo"
] as const;

function options(seed:number, statement:string, answer:string, distractors:string[], steps:string[]):FocusedProblem {
  if (distractors.length !== 4 || new Set([answer,...distractors]).size !== 5)
    throw Error("Alternativas no distinguibles: "+statement);
  const correctIndex=seed%5;
  let cursor=0;
  return {seed,statement,correctIndex,steps,options:Array.from({length:5},(_,i)=>
    String.fromCharCode(97+i)+". "+(i===correctIndex?answer:distractors[cursor++]))};
}
function numeric(seed:number,statement:string,value:number,prefix:string,unit:string,steps:string[],increment=1):FocusedProblem {
  const fmt=(v:number)=>Number(v.toFixed(4)).toString().replace(".",",");
  const label=(v:number)=>prefix+fmt(v)+unit;
  return options(seed,statement,label(value),[
    label(value+increment),label(value+2*increment),
    label(value-increment),label(value-2*increment)
  ],steps);
}

/** null indica que la lección conserva la práctica general revisable. */
export function buildCurricularProblem(slug:string,seed:number):FocusedProblem|null {
  if (!Number.isSafeInteger(seed) || seed<0) throw Error("Semilla inválida");
  const a=2+seed%6;
  const b=1+Math.floor(seed/3)%5;
  const c=2+Math.floor(seed/5)%5;
  switch(slug) {
    case "eliminacion-gauss-jordan-y-rango": {
      const x=a,y=b;
      const S=x+y,D=x-y;
      return options(seed,
        "Resuelve el sistema x + y = "+S+", x − y = "+D+". Determina el par (x, y).",
        "("+x+", "+y+")",
        ["("+(x+1)+", "+y+")","("+x+", "+(y+1)+")",
         "("+(x-1)+", "+y+")","("+x+", "+(y-1)+")"],
        ["Al sumar ambas ecuaciones obtenemos 2x = "+(2*x)+".",
         "Despejamos x = "+x+" y sustituimos en x + y = "+S+".",
         "Obtenemos y = "+y+". La matriz de coeficientes tiene determinante −2, no nulo."]);
    }
    case "espacios-vectoriales-bases-y-dimension": {
      const p=a,q=b;
      return numeric(seed,
        "En R² se tienen u = (1, 0) y v = ("+p+", "+q+"). Calcula el determinante de la matriz con columnas u y v.",
        q,"det = ","",
        ["Formamos la matriz cuyas columnas son los vectores: [[1, "+p+"], [0, "+q+"]].",
         "Su determinante es 1 × "+q+" − 0 × "+p+" = "+q+".",
         "Como det ≠ 0, u y v son linealmente independientes y forman una base de R²."]);
    }
    case "cambio-de-base-y-matriz-de-transicion": {
      const X=a+b,Y=b;
      return options(seed,
        "En R², B = {(1, 0), (1, 1)} y v = ("+X+", "+Y+"). Encuentra las coordenadas [v]B.",
        "("+a+", "+b+")",
        ["("+(a+1)+", "+b+")","("+a+", "+(b+1)+")",
         "("+(a-1)+", "+b+")","("+a+", "+(b-1)+")"],
        ["Expresamos v = c₁(1,0) + c₂(1,1) = (c₁+c₂,c₂).",
         "Por la segunda componente, c₂ = "+Y+".",
         "Por la primera componente, c₁ = "+X+" − "+Y+" = "+a+". Por tanto [v]B = ("+a+", "+b+")."]);
    }
    case "transformaciones-lineales-nucleo-e-imagen": {
      const tx=2*a+b,ty=a-b;
      return options(seed,
        "Sea la transformación lineal T(x,y) = (2x + y, x − y). Calcula T("+a+", "+b+").",
        "("+tx+", "+ty+")",
        ["("+(tx+1)+", "+ty+")","("+tx+", "+(ty+1)+")",
         "("+(tx-1)+", "+ty+")","("+tx+", "+(ty-1)+")"],
        ["La matriz de T en la base canónica es [[2,1],[1,−1]].",
         "Primera componente: 2 × "+a+" + "+b+" = "+tx+".",
         "Segunda componente: "+a+" − "+b+" = "+ty+"."]);
    }
    case "producto-interno-y-gram-schmidt": {
      const p=a,q=b;
      return options(seed,
        "Aplica un paso de Gram-Schmidt a u = (1,0) y v = ("+p+","+q+"). ¿Cuál es w = v − proy_u(v)?",
        "(0, "+q+")",
        ["(1, "+q+")","(0, "+(q+1)+")","("+p+", "+q+")","(0, "+(q-1)+")"],
        ["El producto interno v·u = "+p+" y u·u = 1.",
         "proy_u(v) = (v·u)/(u·u) · u = ("+p+",0).",
         "Restamos: w = ("+p+","+q+") − ("+p+",0) = (0,"+q+"), perpendicular a u."]);
    }
    case "autovalores-autovectores-y-diagonalizacion": {
      const lambda1=a,lambda2=a+c;
      return numeric(seed,
        "La matriz A = diag("+lambda1+", "+lambda2+") es diagonal. ¿Cuál es la suma de sus autovalores?",
        lambda1+lambda2,"Σλ = ","",
        ["Los autovalores de una matriz diagonal son sus entradas diagonales.",
         "Por ello, λ₁ = "+lambda1+" y λ₂ = "+lambda2+".",
         "La suma es λ₁ + λ₂ = "+(lambda1+lambda2)+", igual a la traza de A."]);
    }
    case "diagonalizacion-y-cayley-hamilton": {
      const t=a+b,d=a*b;
      return numeric(seed,
        "Para A = diag("+a+", "+b+"), el teorema de Cayley-Hamilton usa A² − tr(A)A + det(A)I = 0. ¿Cuánto vale det(A)?",
        d,"det(A) = ","",
        ["La matriz es diagonal, por lo que det(A) es el producto de sus dos elementos diagonales.",
         "Calculamos det(A) = "+a+" × "+b+" = "+d+".",
         "La identidad queda A² − "+t+"A + "+d+"I = 0, verificable en cada entrada diagonal."]);
    }
    case "diagonalizacion-ortogonal-y-svd": {
      const major=a+b+c,minor=b;
      return options(seed,
        "La matriz diagonal A = diag("+major+", "+minor+") tiene entradas positivas. Indica sus valores singulares en orden descendente.",
        "("+major+", "+minor+")",
        ["("+(major+1)+", "+minor+")","("+major+", "+(minor+1)+")",
         "("+(major-1)+", "+minor+")","("+major+", "+(minor-1)+")"],
        ["Los valores singulares son las raíces cuadradas de los autovalores de AᵀA.",
         "AᵀA = diag("+(major*major)+", "+(minor*minor)+").",
         "Las raíces positivas son "+major+" y "+minor+"; como "+major+" > "+minor+", ese es el orden."]);
    }
    case "analisis-dimensional-y-vectores": {
      const k=a;
      return numeric(seed,
        "Un vector de fuerza en el plano es F = ("+(3*k)+", "+(4*k)+") N. Determina su magnitud.",
        5*k,"|F| = "," N",
        ["Usamos |F| = √(Fx² + Fy²).",
         "Sustituimos |F| = √("+(3*k)+"² + "+(4*k)+"²).",
         "Por la terna 3–4–5, |F| = 5 × "+k+" = "+(5*k)+" N."]);
    }
    case "cinematica-mru-mruv-y-caida-libre": {
      const v0=a,acc=b,t=2*c,dx=v0*t+acc*t*t/2;
      return numeric(seed,
        "Un móvil parte con v₀ = "+v0+" m/s y acelera uniformemente "+acc+" m/s² durante "+t+" s. Determina su desplazamiento.",
        dx,"Δx = "," m",
        ["En MRUV, Δx = v₀t + (1/2)at².",
         "Sustituimos Δx = "+v0+" × "+t+" + (1/2) × "+acc+" × "+t+"².",
         "Obtenemos Δx = "+dx+" m."]);
    }
    case "cinematica-velocidad-y-aceleracion-instantanea": {
      const speed=10*a;
      return numeric(seed,
        "Se lanza un proyectil con rapidez inicial "+speed+" m/s a 30° sobre la horizontal, con g = 10 m/s². Sin rozamiento, determina el tiempo total de vuelo hasta el mismo nivel.",
        a,"T = "," s",
        ["Componente vertical inicial: v₀y = v₀ sen(30°) = "+(speed/2)+" m/s.",
         "El tiempo de vuelo al mismo nivel es T = 2 v₀y/g.",
         "Sustituyendo T = 2 × "+(speed/2)+" / 10 = "+a+" s."]);
    }
    case "estatica-equilibrio-y-torque": {
      const F=10*a,d=b,torque=F*d;
      return numeric(seed,
        "Se aplica una fuerza perpendicular de "+F+" N a una barra, a "+d+" m del eje. ¿Qué módulo de torque produce?",
        torque,"τ = "," N·m",
        ["El módulo del torque es τ = F d sen(θ).",
         "Como la fuerza es perpendicular, θ = 90° y sen(90°) = 1.",
         "τ = "+F+" × "+d+" = "+torque+" N·m."]);
    }
    case "leyes-de-newton-y-diagrama-de-cuerpo-libre": {
      const m=a,acc=b,F=m*acc;
      return numeric(seed,
        "Sobre un bloque de masa "+m+" kg actúa una fuerza neta horizontal que produce aceleración de "+acc+" m/s². Calcula el módulo de la fuerza neta.",
        F,"F_neta = "," N",
        ["La segunda ley de Newton relaciona fuerza neta, masa y aceleración: F = ma.",
         "Usamos la masa de "+m+" kg y la aceleración de "+acc+" m/s².",
         "F_neta = "+m+" × "+acc+" = "+F+" N."]);
    }
    case "gravitacion-universal-y-leyes-de-kepler": {
      const F=4*a;
      return numeric(seed,
        "Dos masas se atraen gravitacionalmente con fuerza "+F+" N. Si solo duplicamos su distancia, ¿cuál será la nueva fuerza?",
        a,"F_nueva = "," N",
        ["La gravitación de Newton cumple F ∝ 1/r² si las masas se mantienen constantes.",
         "Al duplicar r, la fuerza se divide entre 2² = 4.",
         "F_nueva = "+F+" / 4 = "+a+" N."]);
    }
    case "trabajo-mecanico-y-potencia": {
      const F=10*a,d=2*b,t=2,power=F*d/t;
      return numeric(seed,
        "Una fuerza constante de "+F+" N paralela al desplazamiento mueve un objeto "+d+" m en "+t+" s. Calcula la potencia mecánica media.",
        power,"P = "," W",
        ["Trabajo mecánico: W = F·d = "+F+" × "+d+" = "+(F*d)+" J.",
         "La potencia media es el trabajo dividido entre el tiempo: P = W/t.",
         "P = "+(F*d)+" / "+t+" = "+power+" W."]);
    }
    case "trabajo-energia-mecanica-y-conservacion": {
      const m=2,v=2*a,E=m*v*v/2;
      return numeric(seed,
        "Un cuerpo de "+m+" kg se desplaza a rapidez "+v+" m/s. ¿Cuál es su energía cinética?",
        E,"E_c = "," J",
        ["La energía cinética es E_c = (1/2)mv².",
         "Con m = 2 kg y v = "+v+" m/s, E_c = 1 × "+v+"².",
         "El resultado es E_c = "+E+" J."]);
    }
    case "cantidad-de-movimiento-impulso-y-choques": {
      const m=a,vi=b,vf=b+c,J=m*(vf-vi);
      return numeric(seed,
        "Un cuerpo de masa "+m+" kg aumenta su velocidad de "+vi+" a "+vf+" m/s, sin cambiar de dirección. Calcula el impulso neto.",
        J,"J = "," N·s",
        ["El impulso es el cambio de cantidad de movimiento: J = m(vf − vi).",
         "La variación de velocidad es "+vf+" − "+vi+" = "+c+" m/s.",
         "J = "+m+" × "+c+" = "+J+" N·s."]);
    }
    case "movimiento-armonico-simple-y-frecuencia": {
      const T=2+seed%5;
      const answer="f = 1/"+T+" Hz";
      return options(seed,
        "Una oscilación periódica tiene período T = "+T+" s. Determina su frecuencia f sin redondear.",
        answer, [1,2,3,4].map(d=>"f = 1/"+(T+d)+" Hz"),
        ["La frecuencia expresa cuántas oscilaciones se completan por segundo.",
         "Frecuencia y período cumplen f = 1/T.",
         "Sustituimos T = "+T+" s: f = 1/"+T+" Hz."]);
    }
    case "hidrostatica-pascal-y-arquimedes": {
      const h=1+seed%5,kPa=10*h;
      return numeric(seed,
        "En agua de densidad ρ = 1000 kg/m³ y g = 10 m/s², calcula la presión hidrostática manométrica a profundidad "+h+" m.",
        kPa,"p = "," kPa",
        ["La presión hidrostática manométrica se calcula con p = ρgh.",
         "Sustituimos p = 1000 × 10 × "+h+" = "+(10000*h)+" Pa.",
         "Dividimos entre 1000 Pa/kPa y obtenemos p = "+kPa+" kPa."]);
    }
    case "calorimetria-y-termodinamica": {
      const m=a,dt=5+seed%6,cWater=4.2,Q=Number((m*cWater*dt).toFixed(1));
      return numeric(seed,
        "Se calientan "+m+" kg de agua, con calor específico 4,2 kJ/(kg·°C), elevando su temperatura "+dt+" °C. Sin pérdidas, calcula el calor absorbido.",
        Q,"Q = "," kJ",
        ["En calorimetría, Q = mcΔT.",
         "Sustituimos Q = "+m+" × 4,2 × "+dt+" kJ.",
         "Q = "+Q.toString().replace(".",",")+" kJ, cantidad positiva por tratarse de calentamiento."]);
    }
    case "electrostatica-campo-electrico-y-circuitos": {
      const F=4*a;
      return numeric(seed,
        "Dos cargas puntuales se atraen con fuerza "+F+" N a cierta distancia. ¿Qué fuerza actuaría si la distancia se duplica y las cargas permanecen iguales?",
        a,"F_nueva = "," N",
        ["La ley de Coulomb establece que el módulo de la fuerza varía como 1/r².",
         "Al aumentar la distancia al doble, la fuerza vale un cuarto.",
         "F_nueva = "+F+"/4 = "+a+" N."]);
    }
    case "electrodinamica-y-electromagnetismo": {
      const I=a,R=b,V=I*R;
      return numeric(seed,
        "Por una resistencia óhmica de "+R+" Ω circula una corriente constante de "+I+" A. Determina la diferencia de potencial.",
        V,"V = "," V",
        ["La ley de Ohm relaciona voltaje, corriente y resistencia: V = IR.",
         "Sustituimos I = "+I+" A y R = "+R+" Ω.",
         "El voltaje es V = "+I+" × "+R+" = "+V+" V."]);
    }
    default:return null;
  }
}
