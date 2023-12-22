import { FaGoogle } from 'react-icons/fa6';
import registerImg from '../../assets/register.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

    const {registerUser, updateUser, googleLogin} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const [passError, setPassError] = useState('');
    const axiosPublic = useAxiosPublic();
    const registerNotify = () => toast.success("Registration successful!", {position: "top-center",autoClose: 1000});
    const registerErrorNotify = (message) => toast.error(message, {position: "top-center",autoClose: 1000});
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if(data.password !== data.confirmPass){
            setPassError("Password doesn't match");
            return;
        }
        setPassError('');

        const imageFile = { image: data.photo[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            registerUser(data.email, data.password)
            .then(result => {
                console.log(result)
                updateUser(data.name, res.data.data.display_url)
                .then(result => {
                    console.log(result)
                    registerNotify();
                    navigate('/');
                })
                .catch(error => {
                    console.log(error)
                    registerErrorNotify(error.message);
                })
            })
            .catch(error => {
                console.log(error)
                registerErrorNotify(error.message);
            })
        }
    }

    const handleGoogleRegister = () => {
        googleLogin()
        .then(result => {
            console.log(result)
            registerNotify();
            navigate('/');
        })
        .catch(error => {
            console.log(error)
            registerErrorNotify(error.message);
        })
    }

    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className="grid grid-cols-2">
                    <div>
                        <img src={registerImg} alt="register" />
                    </div>
                    <div className='bg-[#007DFE] px-20 py-20 rounded-xl'>
                        <h2 className='text-4xl font-bold text-white text-center mb-10'>Register Now!</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className=''>
                                    <label className='text-white font-semibold'>Name</label>
                                    <input className='p-3 rounded-lg mt-1 w-full outline-none' type="text" {...register("name")} placeholder='Your Name' />
                                </div> 
                                <div className='my-3'>
                                <label className='text-white font-semibold'>Email</label>
                                    <input className='p-3 rounded-lg w-full outline-none' type="Email" {...register("email")} placeholder='Your Email' />
                                </div> 
                                <div className='my-3'>
                                <label className='text-white font-semibold'>Photo</label>
                                    <input type="file" className="file-input file-input-bordered w-full" {...register("photo")}/>
                                </div> 
                                <div className='my-3'>
                                <label className='text-white font-semibold'>Password</label>
                                    <input className='p-3 rounded-lg w-full outline-none' type="password" {...register("password")} placeholder='Your Password' />
                                </div> 
                                <div className='my-3'>
                                <label className='text-white font-semibold'>Confirm Password</label>
                                    <input className='p-3 rounded-lg w-full outline-none' type="password" {...register("confirmPass")} placeholder='Confirm Password' />
                                    <p className='text-yellow-500'>{passError}</p>
                                </div> 
                                <div>
                                    <input className='btn mt-5 w-full bg-[#2B3440] text-white font-bold border-0 hover:text-black hover:bg-white' type="submit" value="Register Now" />
                                </div>
                            </div>
                        </form>
                        <div className="divider divider-neutral text-white">OR</div>
                            <div className='text-center'>
                                <button onClick={handleGoogleRegister} className='btn bg-white hover:bg-[#2B3440] hover:text-white border-0'><FaGoogle></FaGoogle>Register with Google</button>
                                <p className='text-white mt-5'>Already have an account? Please <Link to="/login" className='underline font-bold'>Login Now!</Link></p>
                                <ToastContainer />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;