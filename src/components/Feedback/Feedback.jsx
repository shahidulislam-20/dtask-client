import people1 from '../../assets/01.jpg';
import people2 from '../../assets/02.jpg';
import people3 from '../../assets/03.jpg';

const Feedback = () => {
    return (
        <div className='bg-base-200'>
            <div className='max-w-7xl lg:px-0 px-5 mx-auto py-20'>
                <h3 className='text-4xl font-bold text-center mb-2'>We love our customers and they love us too.</h3>
                <p className='text-center'>Here is why our customers love us. It is a long established fact that a reader will be distracted.</p>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-10">
                    <div className='p-10 shadow-xl'>
                        <p>As a developer, I love how your task management website helps me stay organized with my coding projects. The intuitive interface and collaboration features make it a must-have tool for my workflow. Kudos to the team for creating such a valuable resource!</p>
                        <div className='flex gap-5 items-center mt-5'>
                            <img className='h-10 w-10 rounded-full' src={people1} alt="people" />
                            <div>
                                <p>John Doe</p>
                                <p>Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-10 shadow-xl'>
                        <p>Our corporate team has been using your task management platform for a few months now, and it has significantly improved our project management efficiency. The user-friendly interface and customizable features are great. We would love to see more options in the future!</p>
                        <div className='flex gap-5 items-center mt-5'>
                            <img className='h-10 w-10 rounded-full' src={people2} alt="people" />
                            <div>
                                <p>Tonny Clave</p>
                                <p>Corporate Professional</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-10 shadow-xl'>
                        <p>Your task management solution has been a game-changer for my small business. Its simple to use yet powerful in helping me prioritize tasks and track project milestones. The ability to collaborate with my team in real-time is invaluable. Looking forward to future !</p>
                        <div className='flex gap-5 items-center mt-5'>
                            <img className='h-10 w-10 rounded-full' src={people3} alt="people" />
                            <div>
                                <p>Alekxandra Bel</p>
                                <p>Entrepreneur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;