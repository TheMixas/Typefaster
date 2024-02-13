export function IsNullOrUndefined(value) {
    return value === null || value === undefined;
}
export function IsNumber(value) {
    return typeof value === 'number';
}

export function IsLoggedIn() {
    return localStorage.getItem('tf_user') !== null;
}

//get username from local storage
