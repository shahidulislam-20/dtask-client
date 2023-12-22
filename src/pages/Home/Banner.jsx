import { Link } from 'react-router-dom';
import bannerImg from '../../assets/banner.png';
import { FaCircleArrowRight } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className='bg-[#D5EBFF] -mt-[5.2rem]'>
            <div className='max-w-7xl mx-auto lg:px-0 px-5'>
                <div className='flex lg:flex-row flex-col-reverse items-center'>
                    <div className='flex-1 pb-10'>
                        <h2 className='text-[#FF2D9B] font-bold text-4xl lg:mt-20'>Effortless Task Mastery Awaits!</h2>
                        <h3 className='text-[#173D7B] font-semibold text-2xl my-3'>Unlock Productivity with Our Intuitive Task Management Platform</h3>
                        <p>Experience a new era of efficiency with our user-friendly task management website. Seamlessly organize your to-dos, collaborate effortlessly, and conquer your goals. Say goodbye to chaos and hello to productivity – start your journey today!</p>
                        <Link to='/login' className='btn bg-[#173D7B] text-white text-md hover:bg-transparent hover:text-[#FF2D9B] hover:border-[#FF2D9B] mt-16 border-2 border-[#173D7B]'>Let&apos;s Explore <FaCircleArrowRight></FaCircleArrowRight></Link>
                    </div>
                    <div className='flex-1'>
                        <img className='w-full pt-14 lg:pt-0' src={bannerImg} alt="banner" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;