import { Document } from 'mongoose';
import { Categoria } from 'src/categorias/interfaces/categoria.interface';

export interface Jogador extends Document {
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  categoria: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
