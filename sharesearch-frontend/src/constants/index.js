export const API_ROOT = 'http://localhost:3000/api/v1'
export const API_WS_ROOT = 'ws://localhost:3000/cable'
export const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}
// export const ACCESS_KEY = 'token'