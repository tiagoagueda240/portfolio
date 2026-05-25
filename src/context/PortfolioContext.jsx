import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {
  educacao as staticEducacao,
  experiencias as staticExp,
  projetos as staticProjetos,
  categoriasSkills as staticSkills,
} from "../data/data";
import { db } from "../lib/firebase";

const PortfolioContext = createContext(null);

const isFirebaseConfigured = () => !!import.meta.env.VITE_FIREBASE_PROJECT_ID;

const docsFromSnap = (snap) =>
  snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const PortfolioProvider = ({ children }) => {
  const [state, setState] = useState({
    experiencias: staticExp,
    projetos: staticProjetos,
    educacao: staticEducacao,
    categoriasSkills: staticSkills,
  });

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubs = [];

    const sub = (col, key, transform) => {
      const q = query(collection(db, col));
      unsubs.push(
        onSnapshot(
          q,
          (snap) => {
            if (snap.empty) return; // mantém dados estáticos se coleção vazia
            const docs = docsFromSnap(snap);
            setState((prev) => ({
              ...prev,
              [key]: transform ? transform(docs) : docs,
            }));
          },
          () => {}, // falha silenciosa — mantém dados estáticos
        ),
      );
    };

    sub("experiencias", "experiencias");
    // Para projetos, normaliza imageUrl → image para compatibilidade dos componentes.
    // Se imageUrl estiver vazio (ainda sem upload), usa a imagem estática como fallback.
    sub("projetos", "projetos", (docs) =>
      docs.map((d) => ({
        ...d,
        image:
          d.imageUrl || staticProjetos.find((p) => p.id === d.id)?.image || "",
      })),
    );
    sub("educacao", "educacao");
    sub("skills", "categoriasSkills");

    return () => unsubs.forEach((u) => u());
  }, []);

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
