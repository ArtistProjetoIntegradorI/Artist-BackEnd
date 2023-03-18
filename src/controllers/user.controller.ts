import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import userRepository from "../repositories/user.repository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, username, password, user_type, document, email, profile_image, cel_phone, status, addressId } = request.body;

                  
    if (!name || !username || !password || !user_type ) {
      const missingFields = [];

      if (!name) missingFields.push("name");
      if (!username) missingFields.push("username");
      if (!password) missingFields.push("password");
      if (!user_type) missingFields.push("user_type");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    
    const user = await userRepository.create({ name, username, password, user_type, document, email, profile_image, cel_phone, status, addressId });

    return response.status(201).json(user);
  }

  async findAll(request: Request, response: Response) {
    const { search } = request.query;

    const categories = await userRepository.findAll({ search: search ? String(search) : undefined });

    return response.json(categories);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuario não encontrado", 404);
    }

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, username, password, user_type, document, email, profile_image, cel_phone, status, addressId } = request.body;

    const stored = await userRepository.findById(id);

    if (!stored) {
      throw new AppError("Usuario não encontrado", 404);
    }

    const user = await userRepository.update(id, { name, username, password, user_type, document, email, profile_image, cel_phone, status, addressId });

    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const stored = await userRepository.findById(id);

    if (!stored) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const user = await userRepository.delete(id);

    return response.json(user);
  }
}

export default new UserController();
