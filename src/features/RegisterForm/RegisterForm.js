import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { NavLink,useLocation,useNavigate } from 'react-router-dom';
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "../../api/axios"
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register_URL="/register"


const RegisterForm = () => {
    const userRef = useRef();
    const errRef = useRef();
    const location=useLocation()
    const navigate=useNavigate()
    const from=location?.state?.from || "/"

    console.log(location)

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);

    

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])






    const handleSubmit=async (e)=>{

        e.preventDefault()
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
        const response=await axios.post(Register_URL,
          JSON.stringify({user,pwd}),{
            headers:{ "content-Type": "application/json"},
            withCredentials:true
          }
        );


        navigate(from)
       


        } catch (err) { 
            if(!err?.response){
                setErrMsg("No server response")
            }
            else if(err.response?.status===409){
                setErrMsg("Username taken")
            }
        }



    }


  return (
    <section className='p-4 md:w-1/2 xl:w-2/5  bg-gray border rounded-lg'>

      <p ref={errRef} className={`${errMsg ? "bg-red-300 p-1 rounded mb-2 " : "left-full absolute"} `} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}  className='flex text-sm md:text-md justify-between flex-col gap-2'>
        <label htmlFor="user">
                            Username:
                            <span>{" "}</span> 
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "left-full absolute"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "left-full absolute": "text-red-500"} />
                        </label>
            <input 
            type='text' value={user} onChange={(e)=>setUser(e.target.value)} 
            autoComplete='off' aria-invalid={validName ? "false" : "true"} 
            aria-describedby='uidnote' required className=' border outline-none dark:border-cyan-700 dark:bg-slate-500' 
            ref={userRef} id='user' onFocus={()=>setUserFocus(true)}
            onBlur={()=>setUserFocus(false)} />

            <p id="uidnote" className={userFocus && user && !validName ? "bg-gray-800 text-white px-4 p-2 rounded-lg " : "fixed left-full"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


            
                        <label htmlFor="password">
                            Password:
                            <span>{" "}</span> 
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "" : "left-full absolute"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "left-full absolute" : "text-red-500"} />
                        </label>
            <input  aria-describedby='pwdnote' value={pwd} onChange={(e)=>setPwd(e.target.value)} type='password' className=' border outline-none dark:border-cyan-700 dark:bg-slate-500' id='password'  onFocus={()=>setPwdFocus(true)}
            onBlur={()=>setPwdFocus(false)} />

             <p id="pwdnote" className={pwdFocus && !validPwd ? "bg-gray-800 text-white px-4 p-2 rounded-lg " : "fixed left-full"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>



                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span>{" "}</span> 
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ?  "" : "left-full absolute"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "left-full absolute" : "text-red-500"} />
                        </label>
                        <input

                            className=' border outline-none dark:border-cyan-700 dark:bg-slate-500'
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "bg-gray-800 text-white px-4 p-2 rounded-lg " : "fixed left-full"}>
                            Must match the first password input field.
                        </p>

                 <button disabled={!validName || !validPwd || !validMatch ? true : false} 
                 className="mt-8 border hover:bg-black hover:text-white text-sm rounded-full p-1 px-4 disabled:opacity-70 disabled:hover:bg-red-700 ">Register</button>
        </form>

            
        <p className='mt-8 text-sm'>
            Already Registered? <br/>
            <NavLink className="hover:font-bold" to="/login">Sign In</NavLink>
        </p>
       


    </section>

  )
}

export default RegisterForm