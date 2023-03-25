import { prisma } from "../infra/prisma/connection";

interface UserSocialProps {
  user: string;
  social: string;
  url: string;
}

class UserSocialRepository {
  async create(user_social: UserSocialProps) {
    const stored = await prisma.user_Social.create({
      data: {
        userId: user_social.user,
        socialId: user_social.social,
        url: user_social.url
      },
    });

    return stored;
  }
 
}

export default new UserSocialRepository();
