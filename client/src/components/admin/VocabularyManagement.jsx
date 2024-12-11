import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../services/api"; // Axios instance for API calls

const VocabularyManagement = () => {
  const [newVocabulary, setNewVocabulary] = useState({
    word: "",
    pronunciation: "",
    whenToSay: "",
    lessonNo: "",
    adminEmail: "",
  });

  const [editingVocabulary, setEditingVocabulary] = useState(null); // For storing the vocabulary being edited
  const [filterLessonNo, setFilterLessonNo] = useState("");

  // Fetch vocabularies using useQuery with v5 object syntax
  const {
    data: vocabularies = [],
    isLoading,
    isError, refetch
  } = useQuery({
    queryKey: ["vocabularies", filterLessonNo],
    queryFn: async () => {
      const response = await api.get("/vocabulary", {
        params: { lessonNo: filterLessonNo },
      });
      return response.data;
    },
  });

  // Add new vocabulary using useMutation with v5 object syntax
  const addVocabulary = useMutation({
    mutationFn: (vocabulary) => api.post("/vocabulary", vocabulary),
    onSuccess: () => {
      alert("Vocabulary added successfully");
      refetch()
    },
  });

  // Delete vocabulary using useMutation with v5 object syntax
  const deleteVocabulary = useMutation({
    mutationFn: (id) => api.delete(`/vocabulary/${id}`),
    onSuccess: () => {
      alert("Vocabulary deleted successfully");
      refetch()
    },
  });

  // Update vocabulary using useMutation with v5 object syntax
  const updateVocabulary = useMutation({
    mutationFn: (vocabulary) =>
      api.put(`/vocabulary/${vocabulary.id}`, vocabulary),
    onSuccess: () => {
      alert("Vocabulary updated successfully");
    },
  });

  const handleAddVocabulary = () => {
    addVocabulary.mutate(newVocabulary);
    setNewVocabulary({
      word: "",
      pronunciation: "",
      whenToSay: "",
      lessonNo: "",
      adminEmail: "",
    });
  };

  const handleFilter = (event) => {
    setFilterLessonNo(event.target.value);
  };

  // Delete vocabulary: Ensure the correct ID is passed
  const handleDelete = (id) => {
    if (id) {
      deleteVocabulary.mutate(id); // Call the delete mutation
    } else {
      console.error("Error: No vocabulary ID provided");
    }
  };

  // Edit vocabulary: Populate form with the vocabulary to edit
  const handleEdit = (vocabulary) => {
    setEditingVocabulary(vocabulary); // Set the vocabulary for editing
  };

  // Update vocabulary: Update the vocabulary after editing
  const handleUpdate = () => {
    if (editingVocabulary) {
      updateVocabulary.mutate(editingVocabulary); // Call the update mutation
      setEditingVocabulary(null); // Clear the editing state after successful update
    }
  };

  if (isLoading)
    return <div className="text-center py-4">Loading vocabularies...</div>;

  if (isError)
    return (
      <div className="text-center py-4 text-red-500">
        Error fetching vocabularies
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Vocabulary Management
        </h1>

        {/* Add New Vocabulary */}
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Add New Vocabulary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Word"
              value={newVocabulary.word}
              onChange={(e) =>
                setNewVocabulary({ ...newVocabulary, word: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Pronunciation"
              value={newVocabulary.pronunciation}
              onChange={(e) =>
                setNewVocabulary({
                  ...newVocabulary,
                  pronunciation: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="When to say"
              value={newVocabulary.whenToSay}
              onChange={(e) =>
                setNewVocabulary({
                  ...newVocabulary,
                  whenToSay: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Lesson No"
              value={newVocabulary.lessonNo}
              onChange={(e) =>
                setNewVocabulary({ ...newVocabulary, lessonNo: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={newVocabulary.adminEmail}
              onChange={(e) =>
                setNewVocabulary({
                  ...newVocabulary,
                  adminEmail: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={handleAddVocabulary}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Vocabulary
          </button>
        </div>

        {/* Filter by Lesson No */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Filter by Lesson No"
            value={filterLessonNo}
            onChange={handleFilter}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Vocabulary List */}
        <div>
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            All Vocabularies
          </h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Word</th>
                <th className="px-4 py-2 border-b">Pronunciation</th>
                <th className="px-4 py-2 border-b">When to Say</th>
                <th className="px-4 py-2 border-b">Lesson No</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vocabularies.map((vocabulary) => (
                <tr key={vocabulary.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{vocabulary.word}</td>
                  <td className="px-4 py-2 border-b">
                    {vocabulary.pronunciation}
                  </td>
                  <td className="px-4 py-2 border-b">{vocabulary.whenToSay}</td>
                  <td className="px-4 py-2 border-b">{vocabulary.lessonNo}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEdit(vocabulary)} // Set the vocabulary for editing
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vocabulary._id)} // Pass the correct id to delete
                      className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Vocabulary Form */}
      {editingVocabulary && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Edit Vocabulary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Word"
              value={editingVocabulary.word}
              onChange={(e) =>
                setEditingVocabulary({
                  ...editingVocabulary,
                  word: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Pronunciation"
              value={editingVocabulary.pronunciation}
              onChange={(e) =>
                setEditingVocabulary({
                  ...editingVocabulary,
                  pronunciation: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="When to say"
              value={editingVocabulary.whenToSay}
              onChange={(e) =>
                setEditingVocabulary({
                  ...editingVocabulary,
                  whenToSay: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Lesson No"
              value={editingVocabulary.lessonNo}
              onChange={(e) =>
                setEditingVocabulary({
                  ...editingVocabulary,
                  lessonNo: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={editingVocabulary.adminEmail}
              onChange={(e) =>
                setEditingVocabulary({
                  ...editingVocabulary,
                  adminEmail: e.target.value,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Vocabulary
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabularyManagement;
