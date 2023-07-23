export interface IRandomItems {
  id: number;
  nom: string | undefined;
  photo: string | undefined;
  description: string | undefined;
  montant: number;
  date_de_fin: string;
  label: undefined | string;
}

export interface ArticlesProps {
  id: number;
  nom: string;
  photo: string;
  prix_de_depart: string;
  date_de_fin: string;
  montant: number;
  categorie_id: number;
  categorie: string;
  categorie_nom: string;
}
