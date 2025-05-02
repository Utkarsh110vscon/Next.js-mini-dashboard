import Link from "next/link";
import AddPageLink from "./AddPageLink";

const Header: React.FC = () => {
    return (
        <div className="px-8 py-2.5 bg-[#0f0f0f74] shadow-md flex justify-between">
            <h1 className="text-[2rem] text-white font-bold tracking-wider">
                <Link href={'/'}>
                    Crud App
                </Link>
            </h1>
            <div className="flex justify-center items-center">
                <AddPageLink />
            </div>
        </div>
    );
}

export default Header;