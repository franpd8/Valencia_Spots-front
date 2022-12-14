import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users/add", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + '/users/login', userData)
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data
}

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(
    API_URL + "/users/logout",
    { headers: { authorization: user?.token, }, }
  );
  if (res.data) {
    localStorage.removeItem("user");
  }
  return res.data;
};

const updateUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/users/update",
    userData,
    { headers: { authorization: user?.token, }, }
  );
  if (res.data) {
    user.user = res.data.user;
    localStorage.setItem("user", JSON.stringify(user));
  }
  return res.data;
}
const updateAvatar = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/users/update-avatar",
    data,
    { headers: { authorization: user?.token, }, }
  );
  if (res.data) {
    user.user = res.data.user;
    localStorage.setItem("user", JSON.stringify(user));
  }
  return res.data;
}

const addToWishlist = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.put(
    API_URL + "/routes/wishlist/" + _id,
    {},
    { headers: { authorization: user?.token, }, }
  );
  if (res.data) {
    user.user.wishlist = [...user.user.wishlist, res.data.routeId]
    localStorage.setItem("user", JSON.stringify(user));
  }
  return res.data;
};

const removeFromWishlist = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.delete(
    API_URL + "/routes/wishlist/" + _id,
    { headers: { authorization: user?.token, }, }
  );
  if (res.data) {
    user.user.wishlist = user.user.wishlist.filter(id => id !== res.data.routeId)
    localStorage.setItem("user", JSON.stringify(user));
  }
  return res.data;
}

const authService = {
  register,
  login,
  logout,
  updateUser,
  updateAvatar,
  addToWishlist,
  removeFromWishlist
};

export default authService;