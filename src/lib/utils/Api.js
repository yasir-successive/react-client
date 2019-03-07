const axios = require("axios");

export const login = async () => {
  try {
    return await axios.post(
      "https://express-training.herokuapp.com/api/user/login",
      {
        email: "head.trainer@successive.tech",
        password: "Training@123"
      }
    );
  } catch (error) {
    console.error(error);
  }
};
