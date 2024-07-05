import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Natan Boos',
      username: 'natanboos',
      password: 'fakepasswevy',
      avatarUrl: 'https://avatars.githubusercontent.com/u/49756903?v=4'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Admin',
      username: 'admin',
      password: 'admin',
      avatarUrl: 'https://ugc.production.linktr.ee/0ea930d9-1d8d-4e01-8ad3-05702aba3c6b_PERFIL-REDES-WEVY-PRETO.png'
    }
  });

  const task1 = await prisma.task.create({
    data: {
      title: 'Learn about node ORM',
      description: 'Lorem ipsum dolor sit amet. Et eaque suscipit est voluptatem quia qui asperiores maiores et velit incidunt? In voluptatem fugit qui modi fuga in consequatur dolorem et minus nobis sed ipsum vero sit ipsa minus. Ut dolorum tempora et expedita nihil qui rerum repellat. Aut molestiae maiores ea consectetur similique et sapiente nulla eos explicabo maxime.',
      user_id: user1.user_id,
      createdAt: new Date(),
    }
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Learn about node ORM',
      description: 'Lorem ipsum dolor sit amet. Et eaque suscipit est voluptatem quia qui asperiores maiores et velit incidunt? In voluptatem fugit qui modi fuga in consequatur dolorem et minus nobis sed ipsum vero sit ipsa minus. Ut dolorum tempora et expedita nihil qui rerum repellat. Aut molestiae maiores ea consectetur similique et sapiente nulla eos explicabo maxime.',
      user_id: user2.user_id,
      createdAt: new Date(),
    }
  });

  const task3 = await prisma.task.create({
    data: {
      title: 'Learn about React',
      description: 'Lorem ipsum dolor sit amet. Et eaque suscipit est voluptatem quia qui asperiores maiores et velit incidunt? In voluptatem fugit qui modi fuga in consequatur dolorem et minus nobis sed ipsum vero sit ipsa minus. Ut dolorum tempora et expedita nihil qui rerum repellat. Aut molestiae maiores ea consectetur similique et sapiente nulla eos explicabo maxime.',
      user_id: user2.user_id,
      createdAt: new Date(),
    }
  });
}

main();