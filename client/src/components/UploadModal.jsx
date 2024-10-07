import propTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import { useParams } from 'react-router-dom';

function UploadModal({ handleClose, handleRefresh }) {
    const folderId = useParams().folderId || null;
    console.log(typeof folderId);
    const submitHandler = async (e) => {
        e.preventDefault();
        const file_sent = e.target.file_sent.files[0];

        const formData = new FormData();
        formData.append('file_sent', file_sent);
        formData.append('folder_id', folderId); // if null it sends "null" as string because of FormData

        const response = await fetch('/test/api/files/create', {
            method: 'POST',
            body: formData
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
                            <div>
                                <h1 className="font-bold text-xl">Upload a file</h1>
                                <p className="text-sm text-gray-500 font-semibold">Select a file you want to upload</p>
                            </div>
                            <IoClose onClick={handleClose} className="text-2xl cursor-pointer ml-auto hover:fill-red-700"/>
                        </div>
                        <input type="file" name='file_sent' className="border p-2 rounded bg-gray-50"/>
                        <button type="submit" className="bg-green-500 rounded p-3 font-bold text-white hover:bg-green-600 mt-3">Upload</button>
                    </form>
                </div>
            </div>
        </>
    )
}

UploadModal.propTypes = {
    handleClose: propTypes.func.isRequired,
    handleRefresh: propTypes.func.isRequired
}

export default UploadModal;