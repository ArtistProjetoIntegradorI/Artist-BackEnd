import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import categoriesRepository from "../repositories/categories.repository";

class CategoriesController {
  async create(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      const missingFields = [];

      if (!name) missingFields.push("name");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    const category = await categoriesRepository.create({ name });

    return response.status(201).json(category);
  }

  async findAll(request: Request, response: Response) {
    const { search } = request.query;

    const categories = await categoriesRepository.findAll({ search: search ? String(search) : undefined });

    return response.json(categories);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const category = await categoriesRepository.findById(id);

    if (!category) {
      throw new AppError("Categoria não encontrado", 404);
    }

    return response.json(category);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const stored = await categoriesRepository.findById(id);

    if (!stored) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const category = await categoriesRepository.update(id, { name });

    return response.json(category);
  }
}

export default new CategoriesController();
