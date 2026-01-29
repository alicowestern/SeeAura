import api from './api';

export default {
    submit(data) {
        return api.post('/inquiries', data);
    },
    getAll() {
        return api.get('/inquiries');
    },
    updateStatus(id, status) {
        return api.put(`/inquiries/${id}/status`, { status });
    },
};
