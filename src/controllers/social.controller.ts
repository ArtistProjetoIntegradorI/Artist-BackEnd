import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import socialRepository from "../repositories/social.repository";

class SocialController {
  async create(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      const missingFields = [];

      if (!name) missingFields.push("name");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    const category = await socialRepository.create({ name });

    return response.status(201).json(category);
  }

  async findAll(request: Request, response: Response) {
    const { search } = request.query;

    const social = await socialRepository.findAll({ search: search ? String(search) : undefined });

    return response.json(social);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const category = await socialRepository.findById(id);

    if (!category) {
      throw new AppError("Rede Social não encontrada.", 404);
    }

    return response.json(category);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const stored = await socialRepository.findById(id);

    if (!stored) {
      throw new AppError("Rede Social não encontrada.", 404);
    }

    const category = await socialRepository.update(id, { name });

    return response.json(category);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const stored = await socialRepository.findById(id);

    if (!stored) {
      throw new AppError("Rede Social não encontrada.", 404);
    }

    const category = await socialRepository.delete(id, { name });

    return response.json(category);
  }
}

export default new SocialController();
