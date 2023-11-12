import axios from 'axios';

export const fetchDataLogs = async () => {
     const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

     return response.data;
};
export const fetchDataLogsDetail = async (id) => {

     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

     return response.data;
};