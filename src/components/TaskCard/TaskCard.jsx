import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { useState } from 'react';

const TaskCard = ({ item, type, index, onDropTask, refet }) => {

    const axiosPublic = useAxiosPublic();

    const [modalData, setModalData] = useState({});

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: `${modalData?.title}`,
            description: `${modalData?.description}`,
        }
    });

    const [{ isDragging }, dragRef] = useDrag({
        type: type,
        item: () => ({ ...item, index }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();

            if (dropResult && item) {
                onDropTask(item)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/task/${id}`)
                    .then(result => {
                        console.log(result)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            icon: "success"
                        });
                        refet();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }


    const onSubmit = (data) => {
        console.log(data)
    }

    const handleUpdate = task => {
        setModalData(task);
    }


    return <> <li
        className="shadow-lg mb-2 border-2"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        ref={dragRef}
    ><div>
            <div className='flex justify-between items-center bg-[#FF2D9B] p-2 text-white font-semi'>
                <h3>{item.title}</h3>
                <div className='flex gap-2'>
                    <span onClick={() => document.getElementById('my_modal_6').showModal()} className='cursor-pointer hover:text-black'><FaPenToSquare onClick={() => handleUpdate(item)}></FaPenToSquare></span>
                    <span onClick={() => handleDelete(item._id)} className='cursor-pointer hover:text-black'><FaTrash></FaTrash></span>
                </div>
            </div>
            <div className='p-2'>
                <p className='my-2'>{item.description}</p>
                <div className='flex justify-between'>
                    {item.priority == 'High' && <span className='bg-red-500 px-2 rounded-sm font-semibold text-white'>{item.priority}</span>}
                    {item.priority == 'Low' && <span className='bg-yellow-500 px-2 rounded-sm font-semibold text-white'>{item.priority}</span>}
                    {item.priority == 'Moderate' && <span className='bg-blue-500 px-2 rounded-sm font-semibold text-white'>{item.priority}</span>}
                    <span className='bg-[#173D7B] px-2 rounded-sm font-semibold text-white'>{item.deadline}</span>
                </div>
            </div>
        </div></li>

        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-center uppercase">Update Task</h3>
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
                    <input className="btn w-full bg-[#FF2D9B] text-white hover:text-black font-semibold" type="submit" value="Update Task" />
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
</>

};

TaskCard.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onDropTask: PropTypes.func.isRequired,
    refet: PropTypes.func.isRequired
}

export default TaskCard;