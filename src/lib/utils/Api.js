const axios = require('axios');

const baseUrl = 'https://express-training.herokuapp.com/api/user';

const callApi = async (methodType, url, traineeData) => {
  try {
    const response = await axios({
      method: methodType,
      url: `${baseUrl}${url}`,
      data: traineeData,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export default callApi;
