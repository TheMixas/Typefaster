import axios from 'axios'
export const sendRegisterRequest = async (data) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', data,{
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        //Set user object in local storage
        localStorage.setItem('tf_user', JSON.stringify(res.data));
    });
  return response.data;
}

export const sendLoginRequest = async (data) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', data,{
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        if(res.data === null){
            console.log("Invalid username or password");
        }
        //Set user object in local storage
        localStorage.setItem('tf_user', JSON.stringify(res.data));
    }).catch(err => {
        console.log(err);
    });
    if(response === undefined){
        return null;
    }
  return response.data;
}

export const sendLogoutRequest = async () => {
    const response = await axios.post('http://localhost:5000/api/auth/logout', {},{
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        console.log("Logout response: ", res);
    });
    return response;
}