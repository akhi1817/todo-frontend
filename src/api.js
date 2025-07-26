const Baseurl = 'https://todo-backend-wheat.vercel.app/api/todos';

const API = {
  GET_TODOS: `${Baseurl}/get-todos`,
  CREATE_TODOS: `${Baseurl}/create-todo`,
  DELETE_TODO: (id) => `${Baseurl}/delete-todo/${id}`, // ✅ function for dynamic URL
};

export default API;
