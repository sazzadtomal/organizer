import { useRef,useState,useEffect} from "react"
import { NavLink,useNavigate,useLocation } from "react-router-dom";
import { setAuth,getAuth } from "./loginSlice";
import { useDispatch,useSelector } from "react-redux";
import axios from "../../api/axios";

const LOGIN_URL="/auth"

const LoginFrom = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch();
    const auth=useSelector(getAuth)
    const location=useLocation();
    const from=location.state?.from?.pathname || "/"

    console.log(location)

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);


    useEffect(()=>{
        userRef.current.focus()
    },[])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])



    const handleSubmit=async (e)=>{

        e.preventDefault()

        try {
            const response=await 
            axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
            {
                headers:{"content-Type":"application/json"},
                withCredentials:true
            })



            const accessToken=response?.data?.accessToken;
            const roles=response?.data?.roles;



            dispatch(setAuth({user,pwd,roles,accessToken}))
            navigate(from, { replace:true })

            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }




   console.log(auth)


  return (
    <section className='p-4 md:w-1/2 xl:w-2/5  bg-gray border rounded-lg' >
        <p ref={errRef} className={`${errMsg ? "bg-red-400 p-2" : "left-full absolute"} `} aria-live="assertive">{errMsg}</p>


        <form onSubmit={handleSubmit} className='flex text-sm md:text-md justify-between flex-col gap-2'>
            <label htmlFor="username">Username :</label>
            <input type="text" id="username" ref={userRef}
            autoComplete="off"
            onChange={(e)=>setUser(e.target.value)}
            value={user}
            required
            className=' border outline-none dark:border-cyan-700 dark:bg-slate-500' 
             />
            <label htmlFor="password">Password :</label>
            <input type="password" id="password"
            onChange={(e)=>setPwd(e.target.value)}
            value={pwd}
            required
            className=' border outline-none dark:border-cyan-700 dark:bg-slate-500'
             />

         <button disabled={!(user && pwd)} className=" mt-8 border hover:bg-black hover:text-white text-sm rounded-full p-1 px-4 disabled:opacity-70 disabled:hover:bg-red-700 ">Register</button>


        </form>

        <p className='mt-8 text-sm'>
            Need an account? <br/>
            <NavLink state={{from:from}} className="hover:font-bold" to="/register"> Register!</NavLink>
        </p>
       

    </section>
  )
}

export default LoginFrom