import React, { useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditTodo = ({ todo, id }) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const modalRef = useRef(null);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const todoDocument = doc(db, 'todo', id);
      await updateDoc(todoDocument, {
        todo: updatedTodo,
      });
      closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Edit Todo
      </button>

      <dialog className="modal" ref={modalRef}>
        <div className="modal-content py-4 text-left px-6">
          <div className="modal-header">
            <h5 className="modal-title text-xl font-bold" id="editLabel">
              Update Todo Details
            </h5>
            <button type="button" className="text-black close" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="flex items-center justify-between" onSubmit={updateTodo}>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={todo}
                onChange={(e) => setUpdatedTodo(e.target.value)}
              />
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditTodo;
