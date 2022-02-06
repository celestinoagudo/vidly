import axios from "axios";
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    console.log("action", action);
    if (action.type !== "apiCallBegan") return next(action);

    next(action);
    const { url, method, data, onSuccess, onError } = action;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:3900/api/movies",
        url,
        method,
        data,
      });
      dispatch({ type: onSuccess, payload: { data: response.data } });
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };

export default api;
