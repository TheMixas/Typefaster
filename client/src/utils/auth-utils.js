export const GetUsername = () => {
    try{
        let tf_user = JSON.parse(localStorage.getItem('tf_user'));
        return tf_user.username;
    }
    catch{
        return null;
    }
}
