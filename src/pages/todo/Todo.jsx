import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, runTransaction, orderBy, query } from 'firebase/firestore';
import EditTodo from './EditTodo';
import { db } from '../../firebase';

const Todo = () => {
  const [createTodo, setCreateTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const collectionRef = collection(db, 'todo');

  useEffect(() => {
    const getTodo = async () => {
      try {
        const q = query(collectionRef, orderBy('timestamp'));
        const snapshot = await getDocs(q);
        const todoData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTodos(todoData);
      } catch (err) {
        console.log(err);
      }
    };
    getTodo();
  }, []);

  const submitTodo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        timestamp: serverTimestamp(),
      });
      setCreateTodo('');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this Task!')) {
        const documentRef = doc(db, 'todo', id);
        await deleteDoc(documentRef);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkHandler = async (event, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });

    setTodos(updatedTodos);

    try {
      const docRef = doc(db, 'todo', id);
      await runTransaction(db, async (transaction) => {
        const todoDoc = await transaction.get(docRef);
        if (!todoDoc.exists()) {
          throw new Error('Document does not exist!');
        }
        const newValue = !todoDoc.data().isChecked;
        transaction.update(docRef, { isChecked: newValue });
      });
      console.log('Transaction successfully committed!');
    } catch (error) {
      console.log('Transaction failed: ', error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="mt-10">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            data-toggle="modal"
            data-target="#addModal"
          >
            Add Todo
          </button>

          {todos.map(({ todo, id, isChecked, timestamp }) => (
            <div className="todo-list" key={id}>
              <div className="todo-item border-b border-gray-300 p-4 flex items-center justify-between">
                <span className={isChecked ? 'line-through' : ''}>
                  <div className="checker">
                    <span className="">
                      <input
                        type="checkbox"
                        defaultChecked={isChecked}
                        name={id}
                        onChange={(event) => checkHandler(event, id)}
                      />
                    </span>
                  </div>
                  &nbsp;{todo}
                  <br />
                  <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
                </span>
                <span className="float-end mx-3">
                  <EditTodo todo={todo} id={id} />
                </span>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteTodo(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <div
        className="modal fixed inset-0 flex items-center justify-center z-50"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

        <div className="modal-container bg-white w-1/2 mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="modal-header">
              <h5 className="modal-title text-xl font-bold" id="exampleModalLabel">
                Add New Todo
              </h5>
              <button
                type="button"
                className="text-black close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setCreateTodo('')}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitTodo}>
                <div className="mb-4">
                  <label htmlFor="todo" className="block text-gray-700 text-sm font-bold mb-2">
                    Todo
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="todo"
                    value={createTodo}
                    onChange={(e) => setCreateTodo(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
