/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, SyntheticEvent } from "react";
import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const addNews = ({ category }: { category: Category[] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    categoryId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post(`/api/news`, {
      ...data,
      categoryId: Number(data.categoryId),
    });
    setIsLoading(false);
    setData({
      title: "",
      description: "",
      categoryId: "",
    });
    router.refresh();
    handleModal();
  };

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={() => handleModal()}>
        Add New
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg"> Add New </h3>
          <form onSubmit={handleSubmit}>
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
                onClick={() => handleModal()}
              >
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addNews;
