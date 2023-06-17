"use client";
import { useState, SyntheticEvent } from "react";
import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type News = {
  title: string;
  description: string;
  id: number;
  categoryId: number | null;
};

const UpdateNews = ({
  news,
  category,
}: {
  news: News;
  category: Category[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    title: news.title,
    description: news.description,
    categoryId: Number(news.categoryId),
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/news/${news.id}`, {
      ...data,
      categoryId: Number(data.categoryId),
    });
    setIsLoading(false);
    router.refresh();
    handleModal();
  };

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {news.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold"> Title</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Title"
                name="title"
                value={data?.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold"> Description</label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                name="description"
                value={data?.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold"> Category</label>
              <select
                value={data.categoryId}
                className="select select-bordered"
                name="categoryId"
                defaultValue={"default"}
                onChange={handleChange}
              >
                <option value="default" disabled>
                  Select a Category
                </option>
                {category.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm"
                onClick={handleModal}
              >
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-sm btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn btn-sm loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNews;
