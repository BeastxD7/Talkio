import Chat from "./pages/Chat"
import ChatRoom from "./pages/ChatRoom"
import LandingPage from "./pages/LandingPage"
import { BrowserRouter , Routes, Route } from "react-router-dom"
import PageNotFound from "./pages/PageNotFound"
const App = () => {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path="/" element={<LandingPage/>}/>
  <Route path="/chat" element={<Chat/>}/>
  <Route path="/chat/:roomId" element={<ChatRoom/>}/>
  <Route path="/*" element ={<PageNotFound/>}/>
</Routes>
</BrowserRouter>
</>
  )
}

export default App