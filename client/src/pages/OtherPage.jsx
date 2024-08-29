import { useEffect } from "react";

function OtherPage() {
    useEffect(() => {
        console.log('Other Page Loaded');
    }, []);

    return (
        <div className="p-5 flex flex-col gap-2">
            <h1 className="font-bold text-xl">Other Page</h1>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
            <div className="font-bold text-xl text-white bg-blue-600 rounded p-2">Test Test</div>
        </div>
    )
}

export default OtherPage;