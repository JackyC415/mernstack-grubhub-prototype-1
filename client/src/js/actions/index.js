import { REGISTER_USER} from "../constants/action-types";
export function registerUser(payload) {
  console.log("dispatching the register action")
  return { type: REGISTER_USER, payload };
} 