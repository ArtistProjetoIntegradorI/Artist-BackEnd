import { prisma } from "../infra/prisma/connection";

interface UserProps {
  name: string;
  username: string;
  password: string;
  status: boolean;
  user_type: string;
  document?: string;
  email?: string;
  profile_image?: string;
  cel_phone: string;
  addressId: string;
}


interface FindAllProps {
  search?: string;
  user_type?: string;
}

class UserRepository {
  async create(user: UserProps) {
    const stored = await prisma.user.create({
      data: user     
    });

    return stored;
  }

  async findAll({ search, user_type }: FindAllProps) {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: search,
        },
        user_type: {
          equals: user_type,
        },
      },
    });

    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, user: UserProps) {
    const stored = await prisma.user.update({
      where: {
        id,
      },
      data: user,
    });

    return stored;
  }

  async delete(id: string) {
    const stored = await prisma.user.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new UserRepository();
