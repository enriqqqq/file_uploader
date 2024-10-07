import { useAuth } from "../contexts/authContext";
import { useState, useEffect } from "react";
import UploadModal from "../components/UploadModal";
import CreateFolderModal from "../components/CreateFolderModal";
import UpdateFolderModal from "../components/UpdateFolderModal";
import FileMenuModal from "../components/FileMenuModal";
import { useParams } from "react-router-dom"; 
import { FaFolder } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import NavigateCust from "../components/NavigateCust";
import FolderMenu from "../components/FolderMenu";

function HomePage() {
    const { user, logout } = useAuth();
    const [ showUploadModal, setShowUploadModal ] = useState(false);
    const [ showCreateFolderModal, setShowCreateFolderModal ] = useState(false);
    const [ showFolderMenu, setShowFolderMenu ] = useState(false);
    const [ showUpdateFolderModal, setShowUpdateFolderModal ] = useState(false);
    const [ showFileMenuModal, setShowFileMenuModal ] = useState(false);
    const { folderId } = useParams();
    const [ refresh, setRefresh ] = useState(false);
    const [ folders, setFolders ] = useState([]);
    const [ files, setFiles ] = useState([]);
    const [ path, setPath ] = useState([]);
    const [ OpenMenuFolder, setOpenMenuFolder ] = useState(null);
    const [ OpenMenuFile, setOpenMenuFile ] = useState(null);

    const deleteFolder = async (folderId) => {
        try {
            const response = await fetch(`/test/api/folders/${folderId}/delete`, {
                method: 'DELETE'
            });
    
            if (response.status === 200) {
                setRefresh(!refresh);
            } else {
                console.log('An error occurred');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log('HomePage loaded'); 
        (async () => {
            try {
                // fetch folders
                const response = await fetch(`/test/api/folders/${folderId ? folderId : ''}`);
                if (response.status !== 200) {
                    console.log('An error occurred: ' + response.status);
                    setFolders([]);
                    return;
                }
                const data = await response.json();
                setFolders(data.folders);
                setPath(data.path);

                // fetch files
                const responseFiles = await fetch(`/test/api/folders/${folderId ? folderId : 'root'}/files`);
                if (responseFiles.status !== 200) {
                    console.log('An error occurred: ' + responseFiles.status);
                    setFiles([]);
                    return;
                }
                const dataFiles = await responseFiles.json();
                console.log(dataFiles);
                setFiles(dataFiles);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [refresh, folderId]);

    return (
        <>
            { showUploadModal ? <UploadModal handleClose={ () => setShowUploadModal(false) } handleRefresh={ () => {setRefresh(!refresh)} }/> : null }
            { showCreateFolderModal ? <CreateFolderModal handleClose={ () => setShowCreateFolderModal(false)}  handleRefresh={ () => { setRefresh(!refresh)}} /> : null }
            { showUpdateFolderModal ? <UpdateFolderModal handleClose={ () => setShowUpdateFolderModal(false)}  handleRefresh={ () => { setRefresh(!refresh)}} folder={OpenMenuFolder}/> : null }
            { showFileMenuModal ? <FileMenuModal handleClose={ () => setShowFileMenuModal(false)}  handleRefresh={ () => { setRefresh(!refresh)}} file={OpenMenuFile}/> : null }

            <div className="p-5 h-screen flex flex-col items-start">
                <h1 className="flex items-center gap-1">
                    <NavigateCust to="/">
                        <p className="font-bold text-xl hover:underline cursor-pointer">Your Files</p>
                    </NavigateCust>
                    {
                        folderId && path.map((path) => {
                            return (
                                <div key={path.id} className="text-gray-500 text-sm flex items-center gap-1">/ 
                                    <NavigateCust key={path.id} to={`/folders/${path.id}`}>
                                        <span className="hover:underline cursor-pointer">{path.name}</span>
                                    </NavigateCust>
                                </div>
                            );
                        })
                    }
                </h1>
                <p className="text-xs">Welcome, {user.displayName}</p>
                <div className="flex gap-3">
                    <button onClick={ ()=>{setShowUploadModal(true); setShowFolderMenu(false);} } className="bg-green-500 rounded p-3 font-bold text-white hover:bg-green-600 mt-3">Upload a File</button>
                    <button onClick={ ()=>{setShowCreateFolderModal(true); setShowFolderMenu(false);} } className="bg-blue-500 rounded p-3 font-bold text-white hover:bg-blue-600 mt-3">Create a Folder</button>
                    <button onClick={logout} className="bg-red-500 rounded p-3 font-bold text-white hover:bg-red-600 mt-3">Logout</button>
                </div>

                {/* Display folders and files */}
                <div className="flex flex-wrap gap-3 mt-5">
                    {folders.map(folder => {
                        return (      
                            <div key={folder.id} className="relative">                      
                                <div className="items-stretch bg-gray-100 rounded flex hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
                                    <NavigateCust to={`/folders/${folder.id}`}>
                                        <div className="flex items-center gap-2 p-3">
                                            <FaFolder/>
                                            <p>{folder.name}</p>
                                        </div>
                                    </NavigateCust>
                                    <div onClick={() => {setShowFolderMenu(!showFolderMenu); setOpenMenuFolder(folder)}} className="rounded-br rounded-tr rounded-tl-3xl rounded-bl-3xl px-3 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-300 ">
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                {
                                    (showFolderMenu && (OpenMenuFolder.id == folder.id)) && <FolderMenu deleteHandler={() => deleteFolder(folder.id)} updateHandler={() => {setShowUpdateFolderModal(true); setShowFolderMenu(false)}}/>
                                }
                            </div>
                        );
                    })}
                    {files.map(file => {
                        return (
                            <div key={file.id} className="items-stretch bg-gray-100 rounded flex hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
                                <div className="flex items-center gap-2 p-3">
                                    <FaFile/>
                                    <p>{file.name}</p>
                                </div>
                                <div onClick={() => {setOpenMenuFile(file); setShowFileMenuModal(true); setShowFolderMenu(false); setOpenMenuFolder(null)}} className="rounded-br rounded-tr rounded-tl-3xl rounded-bl-3xl px-3 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-300 ">
                                    <BsThreeDotsVertical />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default HomePage;