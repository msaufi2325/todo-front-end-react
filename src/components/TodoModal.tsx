import React, { useEffect } from "react";
import { Todo } from "../types/todo";
import { useShowDeletedStore } from "../store";
import styles from "./TodoModal.module.css";

interface TodoModalProps {
  title: string;
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
}

export default function TodoModal({ title, todo, onUpdate }: TodoModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [editedTodo, setEditedTodo] = React.useState(todo);

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  const categoryOptions: Todo["category"][] = ["work", "home", "hobby", "others"];
  const priorityOptions: Todo["priority"][] = ["low", "medium", "high"];

  const showDeleted = useShowDeletedStore((state) => state.showDeleted);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editedTodo.updatedAt = new Date().toISOString();
    onUpdate(editedTodo);
    setShowModal(false);
  };

  const calculateRows = (text: string) => {
    const lines = text.split("\n").length;
    const extraRows = Math.floor(text.length / 50); // Adjust 50 based on average characters per line
    return lines + extraRows;
  };

  const modalStyle = {
    width: "80%", // Adjust the percentage as needed
    maxWidth: "400px", // Adjust the max width as needed
  };

  const formattedDate = editedTodo.updatedAt
    ? new Date(editedTodo.updatedAt).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "Invalid Date";

    const formattedDateCreatedAt = editedTodo.createdAt
    ? new Date(editedTodo.updatedAt).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "Invalid Date";

  return (
    <>
      <button
        className={todo.isCompleted ? "line-through text-gray-400" : ""}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {title}
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className={`relative w-auto my-6 mx-auto ${styles.modal}`}
              style={modalStyle}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                <form className="flex flex-col">
                  <label className="text-xl font-semibold" htmlFor="name">
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editedTodo.title}
                    onChange={handleInputChange}
                    className="border border-solid border-blueGray-200 rounded p-2"
                    disabled={showDeleted}
                  />
                  <label className="relative mt-4" htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    name="description"
                    value={editedTodo.description}
                    onChange={handleInputChange}
                    className="border border-solid border-blueGray-200 rounded p-2"
                    rows={calculateRows(editedTodo.description)}
                    disabled={showDeleted}
                  />
                </form>
                <div className="flex items-center">
                  <label className="p-1">
                    Category:
                    <select
                      name="category"
                      value={editedTodo.category}
                      onChange={handleInputChange}
                      className="border border-solid border-blueGray-200 rounded ml-1 px-1"
                      disabled={showDeleted}
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="p-1">
                    Priority:
                    <select
                      name="priority"
                      value={editedTodo.priority}
                      onChange={handleInputChange}
                      className="border border-solid border-blueGray-200 rounded ml-1 px-1"
                      disabled={showDeleted}
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <hr className="my-2" />
                {todo.title && (
                  <p className="text-sm text-gray-500">
                    Created: {formattedDateCreatedAt} <br />
                    Last updated: {formattedDate}
                    
                  </p>
                )}
                <div className="flex items-center justify-end">
                  <button
                    className="text-white font-bold rounded-md bg-orange-600 uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 m-2 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEditedTodo(todo);
                      setShowModal(false);
                    }}
                  >
                    {showDeleted ? "Close" : "Cancel"}
                  </button>
                  {!showDeleted && (
                    <button
                      type="button"
                      className="text-white bg-green-600 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 m-2 ease-linear transition-all duration-150"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
