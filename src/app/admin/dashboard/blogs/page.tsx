"use client";

import { useEffect, useState, FormEvent } from "react";
import axios, { AxiosError } from 'axios';
import { FiEdit, FiTrash2, FiPlus, } from "react-icons/fi";
import Image from "next/image";
import CardGrid from "@/components/DashboardComponents/CardGrid/CardGrid";
import FormModal from "@/components/DashboardComponents/FormModal/FormModal";
import DeleteConfirmationModal from "@/components/DashboardComponents/DeleteConfirmationModal/DeleteConfirmationModal";
import PaginationControls from "@/components/DashboardComponents/PaginationControls/PaginationControls";
import ImageUpload from "@/components/DashboardComponents/ImageUpload/ImageUpload";

// const API = "http://localhost:3000/api/v1";
const API = process.env.NEXT_PUBLIC_API_BASE_URL

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface Blog {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  postedAt: string;
}

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get<ApiResponse<Blog[]>>(`${API}/blogs`);
      setBlogs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.image) formData.append("imageUrl", form.image);

      if (editId) {
        await axios.put(`${API}/blogs/${editId}`, formData, axiosConfig);
      } else {
        await axios.post(`${API}/blogs`, formData, axiosConfig);  
      }

      resetForm();
      fetchBlogs();
      setShowModal(false);
    }
     catch (err ) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Something went wrong");
    } 
    finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      description: blog.description,
      image: null,
    });
    setEditId(blog._id);
    setPreviewImage(blog.imageUrl);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API}/blogs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteId(null);
      setDeleteModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: null,
    });
    setPreviewImage(null);
    setEditId(null);
    setError("");
  };

  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-[#FFEBEE]">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold">
          <span className="text-[#EF5350]">Blog</span>{" "}
          <span className="text-gray-700">Posts</span>
        </h3>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#EF5350] hover:bg-[#E57373] text-white px-5 py-2 rounded-xl shadow-lg transition"
        >
          <FiPlus size={20} />
          Add Blog Post
        </button>
      </div>

      <CardGrid
        items={currentBlogs}
        renderItem={(blog) => (
          <div
            key={blog._id}
            className="bg-white shadow rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-[#EF5350]/20"
          >
            <div className="relative w-full h-48">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="100%"
              />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h4>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {blog.description}
              </p>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Posted: {formatDate(blog.postedAt)}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-[#EF5350] hover:text-[#E57373] transition"
                    aria-label="Edit blog"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label="Delete blog"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        emptyMessage="No blog posts found."
        gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FormModal
        isOpen={showModal}
        onClose={closeModal}
        title="Blog Post"
        onSubmit={handleSubmit}
        isLoading={loading}
        isEdit={!!editId}
        error={error}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Blog Title</label>
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={form.title}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-md border border-[#EF5350] focus:outline-none focus:ring-2 focus:ring-[#EF9A9A] text-gray-900 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ImageUpload
              previewImage={previewImage}
              onImageChange={(file) => {
                setForm(prev => ({ ...prev, image: file }));
                setPreviewImage(URL.createObjectURL(file));
              }}
              onImageRemove={() => {
                setForm(prev => ({ ...prev, image: null }));
                setPreviewImage(null);
              }}
              label="Blog Image"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label className="text-gray-700 font-medium">Blog Content</label>
          <textarea
            name="description"
            placeholder="Write your blog content here..."
            value={form.description}
            onChange={(e) => {
              handleChange(e);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            required
            rows={8}
            className="px-4 py-2 rounded-md border border-[#EF5350] focus:outline-none focus:ring-2 focus:ring-[#EF9A9A] text-gray-900 transition resize-none overflow-y-auto whitespace-pre-line text-justify"
          />
        </div>
      </FormModal>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
        title="Confirm Delete?"
        message="Are you sure you want to delete this blog post?"
      />
    </div>
  );
}