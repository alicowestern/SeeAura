import axios from 'axios'

const API_URL = '/upload'

const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
}

export default {
    async uploadImages(files) {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }
        return axios.post(API_URL, formData, getAuthHeader())
    }
}
