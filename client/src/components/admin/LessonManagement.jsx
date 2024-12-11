import React, { useState } from "react";
import {
  useLessons,
  useAddLesson,
  useUpdateLesson,
  useDeleteLesson,
} from "../../hook/useLessons";

const LessonManagement = () => {
  const { data: lessons = [], isLoading } = useLessons();
  const addLesson = useAddLesson();
  const updateLesson = useUpdateLesson();
  const deleteLesson = useDeleteLesson();

  const [newLesson, setNewLesson] = useState({ name: "", number: "" });
  const [editingLesson, setEditingLesson] = useState(null);

  const handleAddLesson = () => {
    addLesson.mutate(newLesson);
    setNewLesson({ name: "", number: "" });
  };

  const handleUpdateLesson = () => {
    updateLesson.mutate({ id: editingLesson.id, data: editingLesson });
    setEditingLesson(null);
  };

  const handleDeleteLesson = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      deleteLesson.mutate(id);
    }
  };
  console.log("Lessons data:", lessons);

  if (isLoading) return <p>Loading lessons...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Lesson Management
        </h1>

        {/* Add New Lesson */}
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Add New Lesson
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Lesson Name"
              value={newLesson.name}
              onChange={(e) =>
                setNewLesson({ ...newLesson, name: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Lesson Number"
              value={newLesson.number}
              onChange={(e) =>
                setNewLesson({ ...newLesson, number: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={handleAddLesson}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Lesson
          </button>
        </div>

        {/* Lessons List */}
        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            All Lessons
          </h2>
          <div className="space-y-4">
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {editingLesson?.id === lesson.id ? (
                    <div className="flex space-x-4 w-full">
                      <input
                        type="text"
                        value={editingLesson?.name}
                        onChange={(e) =>
                          setEditingLesson({
                            ...editingLesson,
                            name: e.target.value,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-2/5"
                      />
                      <input
                        type="number"
                        value={editingLesson?.number}
                        onChange={(e) =>
                          setEditingLesson({
                            ...editingLesson,
                            number: e.target.value,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/4"
                      />
                      <button
                        onClick={handleUpdateLesson}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingLesson(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 w-full">
                      <p className="text-xl font-semibold text-gray-800">
                        {lesson.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Lesson #{lesson.number}
                      </p>
                      <p className="text-sm text-gray-500">
                        Vocabulary Count: {lesson.vocabularyCount}
                      </p>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setEditingLesson(lesson)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No lessons found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonManagement;
