/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type News = {
  title: string;
  description: string;
  id: number;
  categoryId: number | null;
};

const deleteNews = ({ news }: { news: News }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (Newid: number) => {
    setIsLoading(true);
    await axios.delete(`/api/news/${Newid}`);
    setIsLoading(false);
    router.refresh();
    handleModal();
  };

  return (
    <>
      <button className="btn btn-sm btn-error" onClick={() => handleModal()}>
        Delete
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete this data {news.title} ?
          </h3>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => handleModal()}
            >
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(news.id)}
                className="btn btn-sm btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default deleteNews;
