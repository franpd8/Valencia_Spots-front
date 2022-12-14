import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getComments = async (data) => {
  const res = await axios.get(`${API_URL}/comments/${data.routeId}?page=${data.page}`);
  return res.data;
};

const createComment = async (commentData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(
    API_URL + "/comments/create",
    commentData,
    { headers: { authorization: user?.token } }
  );
  return res.data;
};

const deleteComment = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/comments/" + id, {
    headers: { authorization: user?.token, },
  });
  return res.data;
};

const updateComment = async (comment) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/comment/" + comment.id, comment,
    { headers: { authorization: user?.token } }
  );
  return res.data
};

const getUnverifiedComments = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(
    API_URL + "/comments/unverified",
    { headers: { authorization: user?.token } }
    );
  return res.data;
}

const validateComment = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/comments/admin-verify/" + id,
    {},
    { headers: { authorization: user?.token } }
  );
  return res.data;
}

const adminDelete = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(
    API_URL + "/comments/admin-delete/" + id,
    { headers: { authorization: user?.token } }
  );
  return res.data;
}

const commentsService = {
  getComments,
  createComment,
  deleteComment,
  updateComment,
  getUnverifiedComments,
  validateComment,
  adminDelete,
};

export default commentsService;