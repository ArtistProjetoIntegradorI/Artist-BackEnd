import { prisma } from "../infra/prisma/connection";

interface SocialProps {
  name: string;
}

interface FindAllProps {
  search?: string;
}

class SocialRepository {
  async create(social: SocialProps) {
    const stored = await prisma.social.create({
      data: social,
    });

    return stored;
  }

  async findAll({ search }: FindAllProps) {
    const categories = await prisma.social.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    return categories;
  }

  async findById(id: string) {
    const social = await prisma.social.findUnique({
      where: {
        id,
      },
    });

    return social;
  }

  async update(id: string, social: SocialProps) {
    const stored = await prisma.social.update({
      where: {
        id,
      },
      data: social,
    });

    return stored;
  }

  async delete(id: string, social: SocialProps) {
    const stored = await prisma.social.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new SocialRepository();
