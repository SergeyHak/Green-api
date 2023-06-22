import { Routes, Route } from "react-router-dom";
import Authorization from "./pages/automatization/authorization";
import Chat from "./pages/chat/chat"
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Authorization />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
}

export default AppRoutes;