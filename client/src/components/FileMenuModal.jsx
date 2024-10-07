import propTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

function FileMenuModal({ handleClose, handleRefresh, file }) {
    const date = new Date(file.createdAt);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    let size = file.size;
    let unitIdx = 0;

    while (size > 1024) {
        size /= 1024;
        unitIdx++;
    }

    size = size.toFixed(2);
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    const handleDelete = async () => {
        try {
            const response = await fetch(`/test/api/files/${file.id}/delete`, {
                method: 'DELETE'
            });

            if (response.status === 200) {
                handleClose();
                handleRefresh();
            } else {
                console.log('An error occurred');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(`/test/api/files/${file.id}/download`);

            if (response.status === 200) {
                // convert response to blob
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // create a link element
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);

                // trigger a click event to start download
                a.click();

                // clean up
                document.body.removeChild(a);
                window.URL.revokeOBjectURL(url);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="w-full h-screen bg-black fixed z-10 opacity-75"></div>
            <div className="flex justify-center items-center h-screen w-full fixed z-20 border-box ">
                <div className="bg-white rounded flex flex-col items-center">
                    <div className="p-5 flex flex-col">
                        <div className="flex justify-between mb-3">
                            <div className="mr-6">
                                <h1 className="font-bold text-xl">File Info</h1>
                                <p className="text-sm text-gray-500 font-semibold">This contain your file info</p>
                            </div>
                            <IoClose onClick={handleClose} className="text-2xl cursor-pointer ml-auto hover:fill-red-700"/>
                        </div>
                        <table className="text-sm">
                            <tbody>
                                <tr>
                                    <td className="font-semibold pr-4">Name</td>
                                    <td>{file.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-4">Size</td>
                                    <td>{size} {units[unitIdx]}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-4">Mime Type</td>
                                    <td>{file.mimeType}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-4">Created At</td>
                                    <td>{formattedDate}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex gap-2 mt-1">
                            <div onClick={handleDownload} className="bg-orange-400 rounded text-sm p-3 font-bold text-white mt-3 self-start hover:bg-orange-500 cursor-pointer">Download</div>
                            <div onClick={handleDelete} className="bg-red-600 rounded text-sm p-3 font-bold text-white mt-3 self-start hover:bg-red-700 cursor-pointer">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

FileMenuModal.propTypes = {
    handleClose: propTypes.func.isRequired,
    handleRefresh: propTypes.func.isRequired,
    file: propTypes.object.isRequired
}

export default FileMenuModal;