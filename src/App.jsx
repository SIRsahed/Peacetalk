import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/signup" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
    </Route>
  ))
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App