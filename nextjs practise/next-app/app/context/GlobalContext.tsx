'use client'

import {
    createContext,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    useContext,
    useRef,
    useState
} from "react";

interface StateType {
    formData: {
        name: string,
        nickName: string,
        familyName: string,
        jobName: string,
        companyName: string,
    },
    setFormData: Dispatch<React.SetStateAction<{
        name: string,
        nickName: string,
        familyName: string,
        jobName: string,
        companyName: string,
    }>>,
    isEdittingInitalized: RefObject<boolean>,
    onAppDataPage: boolean,
    setOnAddDataPage: (value: boolean) => void,
    isAuth: boolean,
    setIsAuth: Dispatch<SetStateAction<boolean>>
}
const GlobalContext = createContext<null | StateType>(null);
interface ChildInterface {
    children: ReactNode
}

export const getContext = () => {
    return useContext(GlobalContext);
}

const GlobalContextProvider = ({ children }: ChildInterface) => {
    const [isAuth, setIsAuth] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nickName: '',
        familyName: '',
        jobName: '',
        companyName: '',
    });
    const isEdittingInitalized = useRef(false);
    const [onAppDataPage, setOnAddDataPage] = useState(false);
    return (
        <GlobalContext.Provider value={{
            formData,
            setFormData,
            isEdittingInitalized,
            onAppDataPage,
            setOnAddDataPage,
            isAuth,
            setIsAuth
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;