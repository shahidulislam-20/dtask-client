

const Users = () => {
    return (
        <div className="max-w-7xl mx-auto py-20">
            <h2 className="font-bold text-3xl text-center my-10">Who Can Benefit from Our Task Management Website?</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:px-0 px-5 gap-10 text-white">
                <div className="text-center p-10 shadow-md bg-blue-400">
                    <h3 className="font-bold uppercase">Developers</h3>
                    <p>Efficiently organize and track coding tasks and project timelines.</p>
                </div>
                <div className="text-center p-10 shadow-md bg-blue-400">
                    <h3 className="font-bold uppercase">Corporate Professionals</h3>
                    <p>Streamline team collaboration and manage projects seamlessly.</p>
                </div>
                <div className="text-center p-10 shadow-md bg-blue-400">
                    <h3 className="font-bold uppercase">Bankers</h3>
                    <p>Stay organized with financial tasks and deadlines.</p>
                </div>
                <div className="text-center p-10 shadow-md bg-blue-400">
                    <h3 className="font-bold uppercase">Students</h3>
                    <p>Keep track of assignments and deadlines with ease.</p>
                </div>
                <div className="text-center p-10 shadow-md bg-blue-400">
                    <h3 className="font-bold uppercase">Entrepreneurs</h3>
                    <p>Manage your business tasks and project milestones efficiently.</p>
                </div>
                <div className="text-center p-10 shadow-md bg-blue-400">
                    <h3 className="font-bold uppercase">Freelancers</h3>
                    <p>Organize and prioritize your freelance projects and deadlines.</p>
                </div>
            </div>
        </div>
    );
};

export default Users;