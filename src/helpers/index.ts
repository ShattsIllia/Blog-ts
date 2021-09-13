export const isAuthorized = () => {
    return localStorage.getItem('token');
}