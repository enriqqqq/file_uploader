import propTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import { useParams } from 'react-router-dom';

function CreateFolderModal({ handleClose, handleRefresh }) {
    const folderId = useParams().folderId || null;

    const submitHandler = async (e) => {
        e.preventDefault();
        const folder_name = e.target.folder_name.value;

        const response = await fetch('/test/api/folders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                folder_name,
                parent_folder_id: folderId
            })
        });

        if (response.status === 200) {
            handleClose();
            handleRefresh();
        } else {
            console.log('An error occurred');
        }
    }

    return (
        <>
            <div className="w-full h-screen bg-black fixed z-10 opacity-75"></div>
            <div className="flex justify-center items-center h-screen w-full fixed z-20 border-box ">
                <div className="bg-white rounded flex flex-col items-center">
                    <form onSubmit={submitHandler} className="p-5 flex flex-col">
                        <div className="flex justify-between mb-3">
                            <div className="mr-6">
                                <h1 className="font-bold text-xl">Create a New Folder</h1>
                                <p className="text-sm text-gray-500 font-semibold">Input a name for your new Folder</p>
                            </div>
                            <IoClose onClick={handleClose} className="text-2xl cursor-pointer ml-auto hover:fill-red-700"/>
                        </div>
                        <input type="text" name='folder_name' placeholder="Folder Name" className="border border-gray-300 p-2 rounded outline-none bg-gray-50"  />
                        <button type="submit" className="bg-green-500 rounded p-3 font-bold text-white hover:bg-green-600 mt-3">Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

CreateFolderModal.propTypes = {
    handleClose: propTypes.func.isRequired,
    handleRefresh: propTypes.func.isRequired
}

export default CreateFolderModal;