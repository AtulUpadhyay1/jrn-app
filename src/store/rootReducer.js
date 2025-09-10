import layout from "./layout";
import email from "../pages/app/email/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";
import kanban from "../pages/app/kanban/store";
import auth from "./api/auth/authSlice";
import cart from "./api/shop/cartSlice";

const rootReducer = {
  layout,
  email,
  chat,
  project,
  kanban,
  auth,
  cart,
};
export default rootReducer;
