import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../LoginForm/loginSlice";
const RequireOath = () => {

   const auth=useSelector(getAuth)
   const location=useLocation()


  return (

   auth?.user?
      <Outlet/> :
     <Navigate to="/login" state={ {from: location} } replace />
  )
}

export default RequireOath