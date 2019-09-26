import { REGISTER_USER, LOGIN_USER} from "../constants/action-types";
export function registerUser(payload) {
  console.log("dispatching the register action")
  return { type: REGISTER_USER, payload };
} 

export function loginUser(payload) {
  console.log("dispatching the login action")
  return { type: LOGIN_USER, payload };
} 