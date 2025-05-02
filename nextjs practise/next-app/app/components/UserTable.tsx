'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getContext } from "../context/GlobalContext";

const UserTable = ({ data }: { data: string[][] }) => {

    const [dashBoardData, setDashBoardData] = useState<string[][]>(data);
    const router = useRouter();

    const stateContext = getContext();

    if (!stateContext) {
        router.push('/');
        return null;
    }
    const setFormData = stateContext.setFormData
    const isEdittingInitalized= stateContext.isEdittingInitalized

    const handleDelete = async (dataIndex: number) => {
        try {
            const result = await fetch(`http://localhost:3001/deletePost?dataIndex=${dataIndex}`, {
                method: 'DELETE'
            });
            const data = await result.json();
            setDashBoardData((prev: string[][]) => prev.filter((_, index: number) => index !== dataIndex));
            console.log('In line number 22 of userTable component: ', data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (dataIndex: number) => {
        const editData = dashBoardData.find((_, index) => index === dataIndex);
        isEdittingInitalized.current= true;
        if(!editData) return;
        setFormData({
            name: editData[0],
            nickName: editData[1],
            familyName: editData[2],
            jobName: editData[3],
            companyName: editData[4],
        });
        router.push('/addData')
    }

    return (
        <table className="w-[80vw] h-fit flex flex-col gap-1.5">

            <thead className="w-full">
                <tr className="grid grid-cols-6 grid-rows-1 bg-[#f0f0f0] shadow-sm py-1.25">
                    <th>Name</th>
                    <th>Nick Name</th>
                    <th>Family Name</th>
                    <th>Job Name</th>
                    <th>Company Name</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody className="w-full flex flex-col gap-1">
                {
                    dashBoardData && dashBoardData.map((user: any[], index: number) => {
                        const mainIndex = index
                        return (
                            <tr key={index} className="grid grid-cols-6 grid-rows-1">
                                {
                                    user.map((value, index) =>
                                    (
                                        value === 'action' ?
                                            <td
                                                key={index}
                                                className={
                                                    `flex items-center justify-center gap-3.5 py-1.5
                          ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'}`
                                                }
                                            >
                                                <button className="cursor-pointer" onClick={() => handleDelete(mainIndex)}>
                                                    <MdDelete className="w-6 h-6 hover:text-[#0f0f0f74]" />
                                                </button>
                                                <button className="cursor-pointer" onClick={() => handleEdit(mainIndex)}>
                                                    <FaRegEdit className="w-6 h-6 hover:text-[#0f0f0f74]" />
                                                </button>
                                            </td>
                                            :
                                            <td
                                                key={index}
                                                className={
                                                    `text-center font-medium py-1.5
                          ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'}`
                                                }
                                            >
                                                {value}
                                            </td>
                                    ))
                                }
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    );
}

export default UserTable;