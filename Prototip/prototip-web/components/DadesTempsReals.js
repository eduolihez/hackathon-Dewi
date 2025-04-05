// PAS 1: Crear un component per carregar i mostrar dades de l'API
// Fitxer: components/DadesTempsReals.js

import { useEffect, useState } from "react";

export default function DadesTempsReals() {
  const [dades, setDades] = useState([]);

  useEffect(() => {
    const obtenirDades = async () => {
      try {
        const res = await fetch("http://localhost:5000/dades"); // API Flask local
        const json = await res.json();
        setDades(json);
      } catch (error) {
        console.error("Error carregant dades:", error);
      }
    };

    obtenirDades();
    const interval = setInterval(obtenirDades, 2000); // Actualitza cada 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">📊 Dades en temps real</h2>
      {dades.length === 0 ? (
        <p>Carregant dades...</p>
      ) : (
        <ul className="space-y-1">
          {dades.slice(-10).reverse().map((dada, index) => (
            <li key={index} className="text-sm text-gray-700">
              🕒 {new Date(dada.timestamp).toLocaleTimeString()} → {Object.entries(dada).filter(([k]) => k !== 'timestamp').map(([k, v]) => `${k}: ${v}`).join(" | ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
