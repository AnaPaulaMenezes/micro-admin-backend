import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jogador } from './interface/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) { }

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(jogador: Jogador): Promise<Jogador> {
    try {
      const jogadorCriado = new this.jogadorModel(jogador);

      return await jogadorCriado.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async atualizarJogador(_id: string, jogador: Jogador): Promise<void> {
    try {
      await this.jogadorModel
        .findByIdAndUpdate({ _id }, { $set: jogador })
        .exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    try {
      return await this.jogadorModel.find().exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    try {

      return await this.jogadorModel.findOne({ _id }).exec();

    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }

  }

  async deletarJogador(_id): Promise<void> {
    try {
      await this.jogadorModel.deleteOne({ _id }).exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
