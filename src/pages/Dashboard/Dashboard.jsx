import { useContext, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useDrop } from "react-dnd";
import { FaCirclePlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();

    const notify = (message) => toast.success(`Task added to ${message} successfully`);

    const { data: taskData = [], refetch } = useQuery({
        queryKey: ['task'], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/task/${user.email}`)
            return res.data;
        }
    })

    const onSubmit = (data) => {
        console.log(data);
        const todoTask = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            email: user?.email,
            tab: "todo"
        }
        axiosPublic.post('/task', todoTask)
            .then(res => {
                console.log(res.data)

                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "Your task has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const [todo, setTodo] = useState(taskData?.filter(d=>d.tab==='todo'))

    const [ongoing, setOngoing] = useState(taskData?.filter(d=>d.tab==='ongoing'));


    // eslint-disable-next-line no-unused-vars
    const [{ isOver }, addToOngoing] = useDrop({
        accept: "todo",
        collect: (monitor) => ({ isOver: !!monitor.isOver() })
    })
    // eslint-disable-next-line no-unused-vars
    const [{ isOver: isTodoOver }, removeFromOngoing] = useDrop({
        accept: "ongoing",
        collect: (monitor) => ({ isOver: !!monitor.isOver() })
    })

    const movetodoFromOngoing = (task) => {
        console.log(task)

        axiosPublic.patch(`/task/${task._id}`)
        .then(()=> {
            refetch();
            notify('Ongoing')
        })
        .catch(error=>console.log(error))

        setTodo((prev) => prev.filter((_, i) => i !== task.index))
        setOngoing((prev) => [...prev, task]);
    }
    const removetodoFromOngoing = (task) => {
        console.log(task)

        axiosPublic.put(`/task/${task._id}`)
        .then(()=> {
            refetch();
            notify('Todo')
        })
        .catch(error=>console.log(error))

        setOngoing((prev) => prev.filter((_, i) => i !== task.index))
        setTodo((prev) => [...prev, task]);
    }

    if(taskData==0 && !todo.title){
        // console.log('lkjlkjkl')
        return <p>Loading...</p>
    }


    console.log(taskData)

    return (
        <div className=" pb-20">
            <div className="text-center pb-10 pt-36 -mt-24 mb-10 bg-[#007DFE]">
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-[#FF2D9B] border-0 text-white uppercase hover:text-black">Add A Task <FaCirclePlus></FaCirclePlus></button>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Task</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="text-left font-semibold">
                            <div>
                                <label>Title</label>
                                <input {...register("title")} className="p-2 bg-[#173D7B] text-white rounded-md w-full" type="text" name="title" placeholder="Add a title" />
                            </div>
                            <div className="my-3">
                                <label>Description</label>
                                <textarea {...register("description")} className="p-2 bg-[#173D7B] text-white rounded-md w-full" placeholder="Add description" cols="5" rows="5"></textarea>
                            </div>
                            <div>
                                <label>Deadline</label>
                                <input {...register("deadline")} className="p-2 bg-[#173D7B] rounded-md w-full text-white" type="date" />
                            </div>
                            <div className="mt-3 mb-5">
                                <label>Priority</label>
                                <select {...register("priority")} className="p-2 bg-[#173D7B] rounded-md w-full text-white">
                                    <option value="Low">Low</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <input className="btn w-full bg-[#FF2D9B] text-white hover:text-black font-semibold" type="submit" value="Add Task" />
                            </div>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>


            <div className="grid lg:grid-cols-3 grid-cols-1 lg:px-0 px-5 gap-20 max-w-7xl mx-auto">
                <div>
                    <h2 className="font-bold uppercase text-center bg-[#173D7B] text-white py-3">todo</h2>
                    <ul className="shadow-xl min-h-[40rem] border-2 p-5" ref={removeFromOngoing}>
                        {
                            todo.map((task, idx) => <TaskCard
                                key={idx}
                                item={task}
                                type="todo"
                                index={idx}
                                refet={refetch}
                                onDropTask={movetodoFromOngoing}
                            ></TaskCard>)
                        }
                    </ul>
                    <ToastContainer />
                </div>
                <div>
                    <h2 className="font-bold uppercase text-center bg-[#173D7B] text-white py-3">ongoing</h2>
                    <ul className="shadow-xl min-h-[40rem] border-2 p-5" ref={addToOngoing}>
                        {
                            ongoing.map((task, idx) => <TaskCard
                                key={idx}
                                item={task}
                                type="ongoing"
                                index={idx}
                                refet={refetch}
                                onDropTask={removetodoFromOngoing}
                            ></TaskCard>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;