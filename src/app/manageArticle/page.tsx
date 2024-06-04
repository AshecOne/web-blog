"use client";
import * as React from "react";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import ClipLoader from "react-spinners/ClipLoader";
import Auth from "@/components/Auth";
import { getCategory } from "@/lib/features/categorySlice";
import { useAppDispatch } from "@/lib/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICategory } from "@/lib/features/categorySlice";

interface IManageArticleProps {}

interface IArticle {
  id: string;
  author: string;
  title: string;
  urlImage: string;
  description: string;
  createdAt: string;
  category: string;
  categoryId: string;
}

const ManageArticle: React.FunctionComponent<IManageArticleProps> = (props) => {
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [editData, setEditData] = React.useState<IArticle | null>(null);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  React.useEffect(() => {
    const getArticles = async () => {
      try {
        const token = localStorage.getItem("user-token");
        const response = await axios.get(
          `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/articles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArticles(response.data.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    getArticles();
  }, []);

  const handleEdit = (article: IArticle) => {
    setEditId(article.id);
    setEditData({ ...article });
  };

  const handleSave = async () => {
    if (editData) {
      try {
        const token = localStorage.getItem("user-token");
        const response = await axios.put(
          `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/articles/${editData.id}`,
          editData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArticles(
          articles.map((article) =>
            article.id === editData.id ? response.data.data : article
          )
        );
        setEditId(null);
        setEditData(null);
        toast.success("Article updated successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update article.");
      }
    }
  };

  const handleDeleteConfirm = (articleId: string) => {
    setDeleteId(articleId);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const token = localStorage.getItem("user-token");
        await axios.delete(
          `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/articles/${deleteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArticles(articles.filter((article) => article.id !== deleteId));
        setDeleteId(null);
        toast.success("Article deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete article.");
      }
    }
  };
  const handleCancel = () => {
    setEditId(null);
    setEditData(null);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={150} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <div className="flex justify-center items-top pt-16 h-screen bg-white">
          <div className="w-full bg-white p-8">
            <h1 className="text-3xl text-black font-bold mb-4">
              Manage Article
            </h1>
            <hr className="mb-6" />
            <div className="flex justify-between mb-4">
              <span className="text-black font-bold">Title</span>
              <span className="text-black font-bold mr-7 pr-7">Action</span>
            </div>
            <hr className="mb-6" />
            <div className="space-y-4">
              {articles.length === 0 ? (
                <p className="text-black text-center">
                  Not have any article, let&apos;s create one.
                </p>
              ) : (
                articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-black">{article.title}</span>
                    <div>
                      <button
                        className="text-white px-4 py-2 bg-blue-700 hover:bg-blue-400 hover:text-black mr-4"
                        onClick={() => handleEdit(article)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white px-4 py-2 bg-red-700 hover:bg-red-400 hover:text-black"
                        onClick={() => handleDeleteConfirm(article.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {editId && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 w-1/2 rounded-lg relative">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={handleCancel}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
                  <div className="flex gap-10">
                    <div className="flex-1 space-y-4">
                      <label htmlFor="title" className="block text-black">
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={editData?.title || ""}
                        onChange={(e) =>
                          setEditData({ ...editData!, title: e.target.value })
                        }
                        className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                      />
                      <label htmlFor="category" className="block text-black">
                        Category
                      </label>
                      <select
                        id="category"
                        value={editData?.categoryId || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData!,
                            categoryId: e.target.value,
                          })
                        }
                        className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                      >
                        <option value="">Select a category</option>
                        {categories.map((val: ICategory) => (
                          <option key={val.id} value={val.id}>
                            {val.title}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="urlimage" className="block text-black">
                        Image URL
                      </label>
                      <input
                        id="urlimage"
                        type="url"
                        value={editData?.urlImage || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData!,
                            urlImage: e.target.value,
                          })
                        }
                        className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                      />
                      <label htmlFor="description" className="block text-black">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={editData?.description || ""}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setEditData({ ...editData!, description: newValue });
                        }}
                        maxLength={500}
                        className="text-black border border-gray-400 rounded-md w-full p-2"
                        style={{ height: "100px" }}
                      />
                      <p className="text-right text-black">
                        {editData?.description.length || 0}/500
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-5 py-2 border rounded-md bg-gray-300 hover:bg-gray-500 hover:text-white text-black mr-4"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-5 py-2 border rounded-md bg-green-600 hover:bg-green-800 text-white"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {deleteId && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 w-1/3 rounded-lg relative">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={handleDeleteCancel}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Delete Article</h2>
                  <p className="mb-4 text-black">
                    Are you sure you want to delete this article?
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-5 py-2 border rounded-md bg-gray-300 hover:bg-gray-500 hover:text-white text-black mr-4"
                      onClick={handleDeleteCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-5 py-2 border rounded-md bg-red-600 hover:bg-red-800 text-white"
                      onClick={handleDelete}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Auth(ManageArticle);
