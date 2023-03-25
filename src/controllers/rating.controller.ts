import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import ratingRepository from "../repositories/rating.repository";
import userRepository from "../repositories/user.repository";

class RatingController {
  async create(request: Request, response: Response) {
    const { value, userRate, user } = request.body;


    if (!value || !userRate || !user) {
      const missingFields = [];

      if (!value) missingFields.push("value");
      if (!userRate) missingFields.push("userRate");
      if (!user) missingFields.push("user");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    //Bloco pra verificar se o valor é valido 
    if (!Number.isInteger(value) || value < 0 || value > 10) {
      throw new AppError(`Valor ${value} invalido!`);
    }

    //Bloco pra verificar se o userRate existe 
    if (typeof userRate == "string") {

      const usRate = await userRepository.findById(userRate);

      if (usRate) {

        const rating = await ratingRepository.create({ value, userRate, user });

        return response.status(201).json(rating);

      } else {
        throw new AppError('User rate não encontrado.');
      }

    } else {
      throw new AppError(`User rate inválido.`);
    }

  }


}

export default new RatingController();
