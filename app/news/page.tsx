import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ModalAdd from "./addNews";
const prisma = new PrismaClient();

const getNews = async () => {
  const news = await prisma.news.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      categoryId: true,
      category: true,
    },
  });
  return news;
};

const getCategory = async () => {
  const category = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return category;
};

const NewsPage = async () => {
  const [news, category] = await Promise.all([getNews(), getCategory()]);
  return (
    <div>
      <ModalAdd category={category} />
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>News</th>
            <th>Description</th>
            <th>Category</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {news.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.title}</td>
              <td>{row.description}</td>
              <td>{row.category?.name}</td>
              <td className="text-center">
                <Link href={`/news/${row.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsPage;
