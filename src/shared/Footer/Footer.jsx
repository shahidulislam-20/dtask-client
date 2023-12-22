import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';
import logoImg from '../../assets/logo.png';

const Footer = () => {
    return (
        <div className='bg-[#173D7B] py-10'>
            <div className='max-w-7xl mx-auto'>
                <footer className='grid lg:grid-cols-2 grid-cols-1 text-center lg:text-left gap-20'>
                    <div>
                        <div className='flex gap-2 justify-center lg:justify-start'>
                            <img className='h-12 w-12' src={logoImg} alt="logo" />
                            <h4 className='text-4xl font-bold text-white'><span className='text-[#FF2D9B]'>D</span>task</h4>
                        </div>
                        <p className='text-white my-5'>Easy to use Work management solution which is both Powerful and intuitive</p>
                        <p className='text-white'>&copy; 2023 | All rights reserved.</p>
                    </div>
                    <div>
                        <h4 className='text-white font-bold'>Social Links</h4>
                        <ul className='mt-5'>
                            <li><a className='flex gap-2 justify-center lg:justify-start items-center text-white' href="https://www.facebook.com">
                                <FaFacebook></FaFacebook> Facebook
                            </a></li>
                            <li><a className='flex gap-2 justify-center lg:justify-start items-center text-white' href="https://www.twitter.com">
                                <FaTwitter></FaTwitter> Twitter
                            </a></li>
                            <li><a className='flex gap-2 justify-center lg:justify-start items-center text-white' href="https://www.instagram.com">
                                <FaInstagram></FaInstagram> Instagram
                            </a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;