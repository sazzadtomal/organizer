import LoginFrom from "../../features/LoginForm/LoginFrom"




const Login = () => {
  return (
    <div className="dark:bg-slate-700 mt-16 gap-4 h-5/6 p-4 px-6 w-full " >
    <div className='flex flex-col gap-2 w-full rounded-lg  dark:text-stone-300 '>
        <h1 className='text-3xl md:text-5xl font-semibold'>Login</h1>
        <p className='text-gray-500 mb-4 lg:text-lg text-sm'>Start organizing your needs, From Today !!!</p>

        <LoginFrom/>

    </div>
  </div>
  )
}

export default Login