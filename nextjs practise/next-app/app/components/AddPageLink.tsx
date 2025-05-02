'use client'

import { useRouter } from "next/navigation";
import { getContext } from "../context/GlobalContext";

const AddPageLink = () => {
    const router = useRouter();
    const stateContext = getContext();
    if (!stateContext) {
        router.push('/');
        return null;
    }
    const { onAppDataPage }= stateContext
    const isEdittingInitalized = stateContext.isEdittingInitalized
    return (
        <button
            onClick={() => {
                console.log('in the button component', isEdittingInitalized.current)
                if (isEdittingInitalized.current) {
                    isEdittingInitalized.current = false;
                }
                router.push('/addData')
            }}
            disabled={onAppDataPage}
            className={
                `bg-[#f0f0f0] rounded-md px-5 py-2.5 shadow text-lg font-medium hover:bg-blue-100 
                ${onAppDataPage ? 'cursor-not-allowed': 'cursor-pointer'}`
            }
        >
            Add Data
        </button>
    );
}

export default AddPageLink;