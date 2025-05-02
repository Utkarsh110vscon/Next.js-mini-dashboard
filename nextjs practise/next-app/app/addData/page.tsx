'use client'
import React, { useEffect, useState } from "react";
import { getContext } from "../context/GlobalContext";
import { useRouter } from "next/navigation";

const AddData = () => {
    const router = useRouter();

    const stateContext = getContext();

    if (!stateContext) {
        router.push('/');
        return null;
    }

    const isEdittingInitalized = stateContext.isEdittingInitalized
    const { setOnAddDataPage } = stateContext

    useEffect(() => {
        setOnAddDataPage(true);
        if (!isEdittingInitalized.current) {
            setFormData({
                name: '',
                nickName: '',
                familyName: '',
                jobName: '',
                companyName: '',
            });
        }

        return () => setOnAddDataPage(false);
    }, []);

    const formData = stateContext.formData
    const setFormData = stateContext.setFormData

    const addNewData = async () => {
        try {
            const res = await fetch('http://localhost:3001/postData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData?.name,
                    nickName: formData?.nickName,
                    familyName: formData?.familyName,
                    jobName: formData?.jobName,
                    companyName: formData?.companyName
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateExistingData = async () => {
        console.log('update existing data');
        try {
            const result = await fetch('http://localhost:3001/updateExistingData', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const message = await result.json();
            console.log(message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        if (isEdittingInitalized.current) {
            updateExistingData()
        } else {
            addNewData()
        }
    }

    return (
            <div className="p-6 h-[calc(100vh-68px)] bg-[#f2f2f2] flex justify-center items-start">
                <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-5">
                    <h2 className="text-2xl font-semibold text-center">User Information</h2>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-lg font-semibold" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData?.name}
                            onChange={(e) => {
                                const { name, value } = e.target
                                setFormData((prev: any) => ({ ...prev, [name]: value }))
                            }}
                            className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                            placeholder="Enter full name"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-lg font-semibold" htmlFor="nickName">Nick Name</label>
                        <input
                            type="text"
                            name="nickName"
                            value={formData.nickName}
                            onChange={(e) => {
                                const { name, value } = e.target
                                setFormData((prev) => ({ ...prev, [name]: value }))
                            }}
                            className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                            placeholder="Enter nick name"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-lg font-semibold" htmlFor="familyName">Family Name</label>
                        <input
                            type="text"
                            name="familyName"
                            value={formData.familyName}
                            onChange={(e) => {
                                const { name, value } = e.target
                                setFormData((prev) => ({ ...prev, [name]: value }))
                            }}
                            className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                            placeholder="Enter family name"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-lg font-semibold" htmlFor="jobName">Job Name</label>
                        <input
                            type="text"
                            name="jobName"
                            value={formData.jobName}
                            onChange={(e) => {
                                const { name, value } = e.target
                                setFormData((prev) => ({ ...prev, [name]: value }))
                            }}
                            className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                            placeholder="Enter job title"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-lg font-semibold" htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={(e) => {
                                const { name, value } = e.target
                                setFormData((prev) => ({ ...prev, [name]: value }))
                            }}
                            className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                            placeholder="Enter company name"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    );
}

export default AddData;