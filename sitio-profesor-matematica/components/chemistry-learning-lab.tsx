"use client";

import React, { useState } from "react";
import { MathFormula } from "./math-formula";

/**
 * Modelos acotados y reproducibles: solo fórmulas de química elemental.
 * El tema elige un experimento relacionado; no se reutiliza el proyectil
 * de Física para dar una apariencia falsa de simulación química.
 */
function selectModel(title: string): "gas" | "solution" | "acid" | "reaction" | "atom" | "mole" {
  const t = title.toLocaleLowerCase("es");
  if (/gaseoso|gases|mezcla de gases/.test(t)) return "gas";
  if (/molaridad|normalidad|soluciones químicas|dilución|neutralización/.test(t)) return "solution";
  if (/equilibrio químico|ph|ácido.base|le chatelier/.test(t)) return "acid";
  if (/estequiometr|reacciones químicas|balance redox|ión.electrón/.test(t)) return "reaction";
  if (/atómic|núclid|cuántic|aufbau|tabla periódica|enlace químico|hibridación|nomenclatura/.test(t)) return "atom";
  return "mole";
}
function Control({ id, label, value, min, max, step, unit, onChange }: {
  id: string; label: string; value: number; min: number; max: number;
  step: number; unit: string; onChange: (n: number) => void;
}) {
  return (
    <label htmlFor={id} className="chem-control block rounded-xl border border-stone-700 bg-stone-900/90 p-4 space-y-3">
      <span className="flex flex-wrap items-baseline justify-between gap-3 text-base text-stone-100">
        <span className="font-semibold">{label}</span>
        <output htmlFor={id} className="font-bold text-emerald-200">{value} {unit}</output>
      </span>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        aria-label={label} onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-emerald-400 min-h-11" />
      <span className="flex justify-between text-sm text-stone-300"><span>{min} {unit}</span><span>{max} {unit}</span></span>
    </label>
  );
}
const fmt = (value: number, digits = 2) =>
  new Intl.NumberFormat("es-PE", { maximumFractionDigits: digits }).format(value);

export function ChemistryLearningLab({ topicTitle }: { topicTitle: string }) {
  const model = selectModel(topicTitle);
  const [n, setN] = useState(1);
  const [t, setT] = useState(300);
  const [v, setV] = useState(15);
  const [z, setZ] = useState(8);
  const [neutrons, setNeutrons] = useState(8);
  const [charge, setCharge] = useState(0);
  const [h2, setH2] = useState(4);
  const [o2, setO2] = useState(3);
  const [acidExponent, setAcidExponent] = useState(4);
  const [mass, setMass] = useState(36);
  const [molarMass, setMolarMass] = useState(18);
  const [volumeSol, setVolumeSol] = useState(1);

  const heading = {
    gas: "Presión, volumen y temperatura de un gas ideal",
    solution: "Concentración molar de una solución",
    acid: "Relación entre concentración de H⁺ y pH",
    reaction: "Reactivo limitante: formación de agua",
    atom: "Protones, neutrones y electrones",
    mole: "Masa, moles y número de partículas",
  }[model];
  const equation = {
    gas: String.raw`PV=nRT,\quad R=0.082057\,\frac{\text{L}\cdot\text{atm}}{\text{mol}\cdot\text{K}}`,
    solution: String.raw`M=\frac{n}{V},\quad V\text{ en litros}`,
    acid: String.raw`\mathrm{pH}=-\log_{10}[\mathrm{H}^+]`,
    reaction: String.raw`2\mathrm{H}_2+\mathrm{O}_2\longrightarrow2\mathrm{H}_2\mathrm{O}`,
    atom: String.raw`A=Z+N,\quad n(e^-)=Z-q`,
    mole: String.raw`n=\frac{m}{M_m},\quad N=nN_A`,
  }[model];

  const pressure = n * 0.082057 * t / v;
  const extent = Math.min(h2 / 2, o2);
  const product = 2 * extent;
  const concentration = n / volumeSol;
  const moleCount = mass / molarMass;
  const pistonY = 195 - (v - 5) * 4.5;

  return (
    <div className="chemistry-learning-lab space-y-5" data-chemistry-model={model}>
      <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 px-4 py-3">
        <h4 className="text-lg font-bold text-white">{heading}</h4>
        <p className="mt-1 text-sm leading-relaxed text-stone-200">
          Modifica los valores y explica por qué cambia el resultado. Este es un ejemplo didáctico con las condiciones que se indican.
        </p>
      </div>
      <div className="chemistry-formula-card rounded-xl border border-stone-700 bg-stone-900 p-3 text-stone-100">
        <MathFormula source={equation} displayMode />
      </div>

      {model === "gas" && (
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center">
          <div className="space-y-3">
            <Control id="chem-n" label="Cantidad de gas" value={n} min={0.5} max={3} step={0.5} unit="mol" onChange={setN} />
            <Control id="chem-t" label="Temperatura absoluta" value={t} min={250} max={450} step={10} unit="K" onChange={setT} />
            <Control id="chem-v" label="Volumen del recipiente" value={v} min={5} max={25} step={1} unit="L" onChange={setV} />
          </div>
          <div className="space-y-3">
            <svg viewBox="0 0 260 250" className="w-full max-h-64" role="img"
              aria-label={`Recipiente con pistón. Volumen ${v} litros; presión ${fmt(pressure)} atmósferas.`}>
              <rect x="48" y="27" width="164" height="181" rx="8" fill="#173a2f" stroke="#aad6b9" strokeWidth="3" />
              <rect x="51" y={pistonY} width="158" height={206-pistonY} fill="#166c67" opacity=".65" />
              <rect x="42" y={pistonY-8} width="176" height="15" rx="4" fill="#e0e7e2" stroke="#84bfa3" strokeWidth="2" />
              <rect x="122" y="12" width="16" height={pistonY-20} rx="3" fill="#d9e9dd" />
              {Array.from({length:10}, (_,i) => (
                <circle key={i} cx={68+(i%5)*27} cy={pistonY+(Math.floor(i/5)+1)*(206-pistonY)/3}
                  r={Math.min(5, (206-pistonY)/5)} fill="#f3ecb4" opacity=".9" />
              ))}
              <text x="130" y="233" fontSize="16" textAnchor="middle" fill="#edf6e7">Pistón móvil</text>
            </svg>
            <p className="text-sm text-stone-200">Si la temperatura y los moles permanecen constantes, al disminuir el volumen aumenta la presión.</p>
          </div>
        </div>
      )}
      {model === "solution" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Control id="chem-soln" label="Moles de soluto" value={n} min={0.5} max={3} step={0.5} unit="mol" onChange={setN} />
          <Control id="chem-solv" label="Volumen final de solución" value={volumeSol} min={0.25} max={3} step={0.25} unit="L" onChange={setVolumeSol} />
        </div>
      )}
      {model === "acid" && (
        <Control id="chem-h" label="Exponente de [H⁺] = 10⁻ᵏ mol/L" value={acidExponent} min={1} max={13} step={1} unit="k" onChange={setAcidExponent} />
      )}
      {model === "reaction" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Control id="chem-h2" label="Hidrógeno inicial (H₂)" value={h2} min={1} max={10} step={1} unit="mol" onChange={setH2} />
          <Control id="chem-o2" label="Oxígeno inicial (O₂)" value={o2} min={1} max={10} step={1} unit="mol" onChange={setO2} />
        </div>
      )}
      {model === "atom" && (
        <div className="grid gap-4 md:grid-cols-3">
          <Control id="chem-z" label="Número atómico Z" value={z} min={1} max={20} step={1} unit="" onChange={setZ} />
          <Control id="chem-neutrons" label="Neutrones N" value={neutrons} min={0} max={30} step={1} unit="" onChange={setNeutrons} />
          <Control id="chem-charge" label="Carga iónica q" value={charge} min={-1} max={1} step={1} unit="e" onChange={setCharge} />
        </div>
      )}
      {model === "mole" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Control id="chem-mass" label="Masa de muestra" value={mass} min={18} max={180} step={18} unit="g" onChange={setMass} />
          <Control id="chem-molar" label="Masa molar de referencia" value={molarMass} min={10} max={60} step={2} unit="g/mol" onChange={setMolarMass} />
        </div>
      )}
      <div className="rounded-xl border border-emerald-700 bg-emerald-950/70 p-4 text-base leading-relaxed text-stone-100" role="status">
        {model === "gas" && <><strong>Presión calculada: {fmt(pressure)} atm.</strong>  P = ({fmt(n)} × 0,082057 × {t}) / {v}.</>}
        {model === "solution" && <><strong>Molaridad: {fmt(concentration)} mol/L.</strong> M = {fmt(n)} / {fmt(volumeSol)}.</>}
        {model === "acid" && <><strong>pH = {acidExponent} · pOH = {14-acidExponent}.</strong> [H⁺] = 10⁻{acidExponent} mol/L. Modelo idealizado a 25 °C.</>}
        {model === "reaction" && <><strong>Agua formada: {fmt(product)} mol.</strong> Restan {fmt(h2 - 2*extent)} mol de H₂ y {fmt(o2-extent)} mol de O₂. Se considera reacción completa.</>}
        {model === "atom" && <><strong>A = {z+neutrons}; protones = {z}; neutrones = {neutrons}; electrones = {z-charge}.</strong> Carga q = {charge > 0 ? "+"+charge : charge}.</>}
        {model === "mole" && <><strong>Cantidad: {fmt(moleCount)} mol.</strong> Partículas aproximadas: {(moleCount*6.02214076e23).toExponential(3)}.</>}
      </div>
    </div>
  );
}
