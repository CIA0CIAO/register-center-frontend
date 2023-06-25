import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore} from "@/stores";
const store = useStore()
const defaultError = () => ElMessage.error('发生了一些错误，请联系管理员')
const defaultFailure = (message) => ElMessage.warning(message)

function post(url, data, success, type='x-www-form-urlencoded',failure = defaultFailure, error = defaultError) {
    const contentType = type === 'json' ? 'json':'x-www-form-urlencoded';
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/'+contentType
        },
        withCredentials: true
    }).then(({data}) => {
        if(data.status === 401)
            router.push('/')
        if(data.success)
            success(data.message, data.status)
        else
            failure(data.message, data.status)
    }).catch(error)
}

function get(url, success, failure = defaultFailure, error = defaultError) {
    axios.get(url, {
        withCredentials: true
    }).then(({data}) => {
        if(data.status === 401)
            router.push('/')
        if(data.success)
            success(data.message, data.status)
        else
            failure(data.message, data.status)
    }).catch(error)
}
const logout = () => {
    get('/api/auth/logout', (message) => {
        ElMessage.success(message)
        store.auth.user = null
        localStorage.removeItem('user')
        router.push('/')
    })
}
const currentUser = (index = false) =>{
    get('/api/user/currentUser', (message) => {
        store.auth.user = message
        localStorage.setItem('user', JSON.stringify(message))
        if(index){
            router.push('/index')
        }
    }, () => {
        store.auth.user = null
    })
}
export { get, post, logout, currentUser}