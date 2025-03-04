
import { useNavigate } from "react-router-dom";

export default function Journal () {
    
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center gap-4 pt-8 font-semibold">
                <h2 className="text-xl">
                    My Journals
                </h2>
                <div>
                    <button onClick={() => navigate('/create-journal')} className="px-2 bg-green-200 rounded-xl hover:text-gray-100">
                        Create New Journal
                    </button>
                </div>
            </div>
        </div>
       
    );
}