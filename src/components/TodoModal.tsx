import React from "react";
import { Todo } from "../types/todo";

interface TodoModalProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
}

export default function TodoModal({ todo, onUpdate }: TodoModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [editedTodo, setEditedTodo] = React.useState(todo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedTodo);
    setShowModal(false);
  };

  const calculateRows = (text: string) => {
    const lines = text.split("\n").length;
    const extraRows = Math.floor(text.length / 20); // Adjust 50 based on average characters per line
    return lines + extraRows;
  };

  const modalStyle = {
    width: "80%", // Adjust the percentage as needed
    maxWidth: "400px", // Adjust the max width as needed
  };

  return (
    <>
      <button
        className={todo.isCompleted ? "line-through text-gray-400" : ""}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {editedTodo.title}
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto" style={modalStyle}>
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
                  />
                  <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-white font-bold rounded-md bg-orange-600 uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 m-2 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setEditedTodo(todo);
                        setShowModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="text-white bg-green-600 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 m-2 ease-linear transition-all duration-150"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
