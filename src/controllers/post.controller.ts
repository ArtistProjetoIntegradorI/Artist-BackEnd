import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import postRepository from "../repositories/post.repository";
import mediaRepository from "../repositories/media.repository";
import multer from 'multer';


class PostController {
  async create(request: Request, response: Response) {
    
    const description = request.body.description;
    const event = request.body.event;
    const user = request.body.user;

    const assets = request.files as Express.Multer.File[];

    if (!description || !user) {
      const missingFields = [];

      if (!description) missingFields.push("description");
      if (!user) missingFields.push("user");
  

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    if(event){
      const post = await postRepository.createEv({ description:description, dh_create: new Date(), userOwnerId:user, eventId:event });

      if(post && assets){
          const medias = createMedias(assets, post.id);
      }

      return response.status(201).json(post);
    }else{
      
      const post = await postRepository.create({ description:description, dh_create: new Date(), userOwnerId:user });
      
      if(post && assets){
        const medias = createMedias(assets, post.id);
      }

      return response.status(201).json(post);
    } 
    
  }

  async findAll(request: Request, response: Response) {
    const { search } = request.query;

    const posts = await postRepository.findAll({ search: search ? String(search) : undefined });

    return response.json(posts);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const post = await postRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado", 404);
    }

    return response.json(post);
  }

  async findByUser(request: Request, response: Response) {
    const { id } = request.params;

    const post = await postRepository.findByUser(id);

    if (!post) {
      throw new AppError("Posts não encontrado", 404);
    }

    return response.json(post);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { description, eventId, media } = request.body;

    const stored = await postRepository.findById(id);

    if (!stored) {
      throw new AppError("Post não encontrado", 404);
    }

    const post = await postRepository.update(id, {description, eventId});

    return response.json(post);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const stored = await postRepository.findById(id);

    if (!stored) {
      throw new AppError("Post não encontrado", 404);
    }

    const post = await postRepository.delete(id);

    return response.json(post);
  }
}
 function createMedias(medias:Express.Multer.File[], post: string){
    
  const retMedias = [];


  for (const file of medias) {
    const med = mediaRepository.create({
      name: file.filename,
      path: file.path,
      post: post
    });
    
    retMedias.push(med);

  }

  return retMedias;
}
export default new PostController();
