import propTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import { useParams } from 'react-router-dom';

function UploadModal({ handleClose }) {
    return (
        <>
            <div className="w-full h-screen bg-black fixed z-10 opacity-75"></div>
            <div className="flex justify-center items-center h-screen w-full fixed z-20 border-box ">
                <div className="bg-white rounded flex flex-col items-center">
                    <form action="" method="post" encType="multipart/form-data" className="p-5 flex flex-col">
                        <div className="flex justify-between mb-3">
                            <div>
                                <h1 className="font-bold text-xl">Upload a file</h1>
                                <p className="text-sm text-gray-500 font-semibold">Select a file you want to upload</p>
                            </div>
                            <IoClose onClick={handleClose} className="text-2xl cursor-pointer ml-auto hover:fill-red-700"/>
                        </div>
                        <input type="file" name='file_sent' className="border p-2 rounded bg-gray-50"/>
                        <input type="hidden" name="folderId" value={useParams().folderId || ""} />
                        <button type="submit" className="bg-green-500 rounded p-3 font-bold text-white hover:bg-green-600 mt-3">Upload</button>
                    </form>
                </div>
            </div>
        </>
    )
}

UploadModal.propTypes = {
    handleClose: propTypes.func.isRequired
}

export default UploadModal;