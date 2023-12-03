export default interface IGetDataResponse {
  id: number;
  ano: number;
  id_escola: number;
  rede: string;
  ensino: string;
  anos_escolares: string;
  taxa_aprovacao: number;
  indicador_rendimento: number;
  nota_saeb_matematica: number;
  nota_saeb_lingua_portuguesa: number;
  nota_saeb_media_padronizada: number;
  ideb: number;
  projecao: number | null;
  nome_escola?: string;
  [key: string]: any;
}

export interface IGetSchoolsNameResponse {
  id_escola: number;
  nome_escola: string;
}
