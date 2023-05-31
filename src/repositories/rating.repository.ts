import { prisma } from "../infra/prisma/connection";

interface RatingProps {
  value: number;
  userRate: string;
  user: string;
}

interface FindAllProps {
  search?: string;
}

class ratingRepository {
  async create(rating: RatingProps) {
    const stored = await prisma.rating.create({
      data: {
        value: rating.value,
        userRate: rating.userRate,
        user:{
          connect: {
            id: rating.user
          }
        }
      }     
    });

    return stored;
  }

  async findByUser(idRate: string, idUser: string) {
    const rating = await prisma.rating.findFirst({
      where: {
        userRate: idRate,
        userId: idUser
      }
    });

    return rating;
  }

  async update(id: string, rating: number) {
    const stored = await prisma.rating.update({
      where: {
        id,
      },
      data: {
        value: rating
      },
    });

    return stored;
  }

}

export default new ratingRepository();
