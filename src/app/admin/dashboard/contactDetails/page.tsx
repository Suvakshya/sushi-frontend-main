"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiEye, FiTrash2, FiMail, FiPhone, FiUser } from "react-icons/fi";

// Reusable Components
import CardGrid from "@/components/DashboardComponents/CardGrid/CardGrid";
import ViewDetailsModal from "@/components/DashboardComponents/ViewDetailsModal/ViewDetailsModel";
import DeleteConfirmationModal from "@/components/DashboardComponents/DeleteConfirmationModal/DeleteConfirmationModal";
import PaginationControls from "@/components/DashboardComponents/PaginationControls/PaginationControls";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirst, indexOfLast);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<ApiResponse<Contact[]>>(`${API}/contact/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.data.success) {
        setContacts(res.data.data || []);
      } else {
        setError(res.data.message || "Failed to fetch contacts");
      }
    } catch (err: any) {
      console.error("Error fetching contacts:", err);
      setError(err.response?.data?.message || "Failed to fetch contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      await axios.delete(`${API}/contact/contacts/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setDeleteId(null);
      setDeleteModalOpen(false);
      fetchContacts(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting contact:", error);
      alert(error.response?.data?.message || "Failed to delete contact");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-[#FFEBEE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#FFEBEE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchContacts}
            className="bg-[#EF5350] text-white px-4 py-2 rounded hover:bg-[#E57373] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderContactCard = (contact: Contact) => (
    <div
      key={contact.id}
      className="bg-white rounded-xl shadow-md p-5 space-y-3 border border-[#EF5350]/40 hover:scale-[1.02] transition-transform duration-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="bg-[#EF5350] text-white p-2 rounded-full">
            <FiUser size={16} />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {contact.name}
          </h4>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {new Date(contact.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FiMail className="text-[#EF5350]" size={14} />
          <span className="truncate">{contact.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FiPhone className="text-[#EF5350]" size={14} />
          <span>{contact.mobileNumber}</span>
        </div>
      </div>

      {contact.description && (
        <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded">
          {contact.description}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button
          onClick={() => setViewContact(contact)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform px-3 py-1 rounded text-sm"
          title="View Details"
        >
          <FiEye size={14} />
          View
        </button>
        <button
          onClick={() => handleDeleteClick(contact.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 hover:scale-110 transition-transform px-3 py-1 rounded text-sm"
          title="Delete Contact"
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );

  const viewModalFields = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Mobile Number", key: "mobileNumber" },
    { 
      label: "Description", 
      key: "description",
      render: (value: string) => (
        <div className="bg-gray-50 p-3 rounded border">
          {value || <span className="text-gray-400 italic">No description provided</span>}
        </div>
      ),
      colSpan: 2
    },
    { 
      label: "Created On", 
      key: "createdAt",
      render: (value: string) => new Date(value).toLocaleString(),
      colSpan: 1
    },
    { 
      label: "Last Updated", 
      key: "updatedAt",
      render: (value: string) => new Date(value).toLocaleString(),
      colSpan: 1
    }
  ];

  return (
    <div className="p-6 bg-[#FFEBEE] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            <span className="text-[#EF5350]">Contact</span>{" "}
            <span className="text-gray-700">Management</span>
          </h2>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
              Total: {contacts.length} contacts
            </span>
            <button
              onClick={fetchContacts}
              className="bg-[#EF5350] text-white px-4 py-2 rounded-lg hover:bg-[#E57373] transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No contacts found</h3>
            <p className="text-gray-500">Contact submissions will appear here.</p>
          </div>
        ) : (
          <>
            <CardGrid
              items={currentContacts}
              renderItem={renderContactCard}
              emptyMessage="No contacts found."
              gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              className="pb-2"
            />

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <ViewDetailsModal<any>
        isOpen={!!viewContact}
        onClose={() => setViewContact(null)}
        title="Contact Details"
        data={viewContact || {}}
        fields={viewModalFields}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Contact?"
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />
    </div>
  );
}