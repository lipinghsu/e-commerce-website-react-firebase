import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
    //check if currentUser is valid 
    if(!currentUser || !Array.isArray(currentUser.userRoles)){
        return false;
    }
    //it's valid -> destructure from currentUser 
    const { userRoles } = currentUser;

    //check if user has admin rights
    if(userRoles.includes('admin')){
        return true;
    }
    return false;
}

export const apiInstance = axios.create({
    baseURL: 'https://us-central1-replikon-bf757.cloudfunctions.net/api'
});