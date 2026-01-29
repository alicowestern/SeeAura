import api from './api';

export default {
    getAll() {
        return api.get('/templates');
    },
    getOne(id) {
        return api.get(`/templates/${id}`);
    },
    create(data) {
        return api.post('/templates', data);
    },
    remove(id) {
        return api.delete(`/templates/${id}`);
    },
};
