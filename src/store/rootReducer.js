import layout from "./layout";
import auth from "./api/auth/authSlice";
import adminAuth from "./api/auth/adminAuthSlice";

const rootReducer = {
  layout,
  auth,
  adminAuth,
};
export default rootReducer;
