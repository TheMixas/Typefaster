import axios from "axios";
import {SERVER_URL} from "../../config";

//RETURNS AXIOS RESPONSE
export const GetProfile = async (username) => {
    if(!username){
        throw new Error("Username is required");
        return
    }
    console.log("GetProfile called with username: ", username, " and process.env.REACT_APP_SERVER_URL: ", process.env.REACT_APP_SERVER_URL);
  const response = await axios.get(`${SERVER_URL}/api/profile/${username}`);
  console.log('Axuis response ', response)
  return response;
}