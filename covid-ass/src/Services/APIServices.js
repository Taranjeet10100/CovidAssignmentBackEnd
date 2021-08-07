import Axios from 'axios';
const BASE_URL = 'http://localhost:5800';
const AxiosInstance = Axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {},
});
const setAuthorizationToken = (token) => {
    AxiosInstance.defaults.headers.common.Authorization =
        token
            ? `Bearer ${token}`
            : "";
};
async function postMethod(endpoint, data) {
    return new Promise(resolve => {
        var config = {
            method: 'post',
            url: endpoint,
            data: data
        };
        AxiosInstance(config).then(response => {
            resolve(response.data);
        }, error => {
            resolve(error.response);
        })
    });
};

async function getMethod(path, params = {}) {
    return new Promise(resolve => {
        var config = {
            method: 'get',
            url: path,
            params: params
        };
        AxiosInstance(config).then(response => {
            resolve(response.data)
        }, error => {
            if (!error.response || error.code === 'ECONNABORTED') {
                resolve({ status: false, message: 'error!' })
            } else {
                resolve(error.response)
            }
        })
    })
}

async function deleteMethod(path) {
    return new Promise(resolve => {
        var config = {
            method: 'delete',
            url: path,
        };
        AxiosInstance(config).then(response => {
            resolve(response.data)
        }, error => {
            resolve(error.response)
        })
    })
}
export {postMethod,setAuthorizationToken, getMethod, deleteMethod};
  
