import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 2000,
  // headers: {
  //   'Access-Control-Allow-Origin': '*', // * или ваш домен
  //   'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  // },
  params: {
    key: import.meta.env.VITE_API_RAWG_KEY as string,
  },
})

export default instance
