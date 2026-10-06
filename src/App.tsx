import { ProtectedRoute } from "./components/ProtectedRoutes";
import Dashboar from "./pages/dashborad";
import LoginPage from "./pages/loginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/auth";

function App() {

  const isAuth = useAuthStore(state => state.isAuth)


  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>


        <Route element={<ProtectedRoute isAllowed={isAuth} children={undefined} />}>
          <Route path="/dashboard" element={<Dashboar />}></Route>
        </Route>



      </Routes>
    </BrowserRouter>
  )

}

export default App;