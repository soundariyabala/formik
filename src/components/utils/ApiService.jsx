import axios from 'axios'
const API_URL='https://659848cf668d248edf2466c4.mockapi.io'



const AxiosService=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})


export default AxiosService