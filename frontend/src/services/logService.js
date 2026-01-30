import axios from 'axios'

const API_URL = '/logs'

const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}

export default {
    async getAll() {
        return axios.get(API_URL, getAuthHeader())
    }
}
