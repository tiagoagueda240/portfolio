import { doc, setDoc } from "firebase/firestore";
import {
  categoriasSkills,
  educacao,
  experiencias,
  projetos,
} from "../data/data";
import { db } from "./firebase";

/**
 * Popula o Firestore com os dados estáticos de data.jsx.
 * Deve ser executado uma única vez a partir do Dashboard admin.
 */
export const seedFirestore = async () => {
  // Experiências
  for (const [i, item] of experiencias.entries()) {
    await setDoc(doc(db, "experiencias", item.id), { ...item, order: i });
  }

  // Projetos — imagens importadas não são serializáveis no Firestore,
  // por isso ficam a vazio até o utilizador fazer upload via backoffice.
  for (const [i, item] of projetos.entries()) {
    const { image: _img, ...rest } = item;
    await setDoc(doc(db, "projetos", item.id), {
      ...rest,
      imageUrl: "",
      order: i,
      detalhes: {
        ...item.detalhes,
        galeria: [], // será preenchido com URLs do Cloudinary
      },
    });
  }

  // Educação
  for (const [i, item] of educacao.entries()) {
    await setDoc(doc(db, "educacao", item.id), { ...item, order: i });
  }

  // Skills
  for (const [i, item] of categoriasSkills.entries()) {
    await setDoc(doc(db, "skills", item.id), { ...item, order: i });
  }
};
