import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import propTypes from "prop-types";

function FolderMenu({ deleteHandler, updateHandler }) {
    return (
        <div className="absolute z-10 -ml-3 bg-slate-50 rounded flex flex-col top-1/2 left-full">
            <div onClick={deleteHandler} className="flex rounded-t items-center gap-2 p-3 hover:bg-slate-100 transition ease-in-out duration-300 hover:cursor-pointer">
                <MdDelete className="text-xl"/>
                <p>Delete</p>
            </div>
            <div onClick={updateHandler} className="flex items-center rounded-b gap-2 p-3 hover:bg-slate-100 transition ease-in-out duration-300 hover:cursor-pointer">
                <MdEdit className="text-xl"/>
                <p>Rename</p>
            </div>
        </div>
    );
}

FolderMenu.propTypes = {
    deleteHandler: propTypes.func.isRequired,
    updateHandler: propTypes.func.isRequired
}

export default FolderMenu;