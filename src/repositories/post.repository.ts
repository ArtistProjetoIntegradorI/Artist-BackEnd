import { prisma } from "../infra/prisma/connection";

interface postProps {
  description: string;
  dh_create?: Date;
  userOwnerId?: string;
  eventId?: string;
}

interface FindAllProps {
  search?: string;
}

class PostRepository {
  async createEv(post: postProps) {
    const stored = await prisma.post.create({
      data: {
        description: post.description,
        user : {
          connect :{
            id: post.userOwnerId
          }
        },
        event : {
          connect :{
            id: post.eventId
          }
        }
      }
    });

    return stored;
  }

  async create(post: postProps) {
    const stored = await prisma.post.create({
      data: {
        description: post.description,
        user : {
          connect :{
            id: post.userOwnerId
          }
        }
      }
    });

    return stored;
  }

  async findAll({ search }: FindAllProps) {
    const posts = await prisma.post.findMany({
      where: {
        description: {
          contains: search,
        }
      },
      include:{
        event:true,
        medias:true,
        user:true
      } 
    });

    return posts;
  }

  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async findByUser(id: string) {
    const post = await prisma.post.findMany({
      where: {
       user: {
        id: id
       }
      }
    });

    return post;
  }

  async update(id: string, post: postProps) {
    const stored = await prisma.post.update({
      where: {
        id,
      },
      data: post,
    });

    return stored;
  }

  async delete(id: string) {
    const stored = await prisma.post.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new PostRepository();
