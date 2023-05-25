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

  async findByUser(id: string) {
    const rating = await prisma.rating.findMany({
      where: {
        userRate: id
      }
    });

    return rating;
  }

}

export default new ratingRepository();
