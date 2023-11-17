import axios from 'axios';

const API_POST_URL = 'https://jsonplaceholder.typicode.com/posts'
const API_USERS_URL = 'http://localhost:3001/user'

export const fetchDataLogs = async () => {
     const response = await axios.get(`${API_POST_URL}`);

     return response.data;
};
export const fetchDataLogsDetail = async (id) => {

     const response = await axios.get(`${API_POST_URL}/${id}`)

     return response.data;
};

//get all User
export const getAllUser = async () => await axios.get(API_USERS_URL)
export const addUser = async (inputValue) => await axios.post(`${API_USERS_URL}`, inputValue)
export const deleteUser = async (id) => await axios.delete(`${API_USERS_URL}/${id}`)