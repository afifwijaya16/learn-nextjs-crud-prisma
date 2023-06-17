import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { News } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: News = await request.json();

  const news = await prisma.news.create({
    data: {
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(news);
};
