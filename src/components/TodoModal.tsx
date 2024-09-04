import React from "react";
import { Todo } from "../types/todo";

interface TodoModalProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
}

export default function TodoModal({ todo, onUpdate }: TodoModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [editedTodo, setEditedTodo] = React.useState(todo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  
  return (
    <>
      <button
        className={todo.isCompleted ? "line-through text-gray-400" : ""}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {todo.title}
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col p-5 border-b border-solid border-blueGray-200 rounded-t"
              >
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
                  />
                <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
