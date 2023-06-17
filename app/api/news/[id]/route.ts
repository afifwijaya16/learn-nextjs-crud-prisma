import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { News } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: News = await request.json();
  const news = await prisma.news.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(news, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const news = await prisma.news.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(news, { status: 200 });
};
