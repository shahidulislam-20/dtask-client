import { FaGoogle, FaLock, FaUser } from 'react-icons/fa6';
import loginImg from '../../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const { loginUser, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const loginNotify = () => toast.success("Log in successful!", { position: "top-center", autoClose: 1000 });
    const loginErrorNotify = (message) => toast.error(message, { position: "top-center", autoClose: 1000 });
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data.email, data.password)
        const email = data.email;
        const password = data.password;
        loginUser(email, password)
            .then(result => {
                console.log(result)
                loginNotify();
                navigate('/dashboard');
            })
            .catch(error => {
                console.log(error)
                loginErrorNotify(error.message);
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result)
                loginNotify();
                navigate('/dashboard');
            })
            .catch(error => {
                console.log(error)
                loginErrorNotify(error.message);
            })
    }

    return (
        <div className='bg-[#173D7B] py-6'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex lg:flex-row flex-col px-5 lg:px-0'>
                    <div className='flex-1'>
                        <img className='lg:block hidden' src={loginImg} alt="login" />
                    </div>
                    <div className='flex-1'>
                        <div className='lg:ml-20 px-10 bg-[#FF2D9B] py-20 rounded-lg mt-10'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className='text-white font-bold text-4xl text-center mb-10'>Welcome!</h2>
                                <div className='flex'>
                                    <FaUser className='text-white bg-[#EB7A00] w-11 h-11 p-3 rounded-l-md text-2xl'></FaUser>
                                    <input className='w-full rounded-r-md outline-none p-2' type="email" {...register("email")} placeholder='Email' />
                                </div>
                                <div className='flex mt-2'>
                                    <FaLock className='text-white bg-[#EB7A00] w-11 h-11 p-3 rounded-l-md text-2xl'></FaLock>
                                    <input className='w-full rounded-r-md outline-none p-2' type="password" {...register("password")} placeholder='Password' />
                                </div>
                                <div>
                                    <input className='btn hover:text-[#EB7A00] w-full mt-5 font-bold bg-[#EB7A00] uppercase text-white border-0 hover:bg-white' type="submit" value="Login" />
                                </div>
                            </form>
                            <div className="divider divider-warning text-white">OR</div>
                            <div className='text-center'>
                                <button onClick={handleGoogleLogin} className='btn bg-white hover:bg-[#EB7A00] hover:text-white border-0'><FaGoogle></FaGoogle>Login with Google</button>
                                <p className='text-white mt-5'>New Here? Please <Link to="/register" className='underline font-bold'>Register Now!</Link></p>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;