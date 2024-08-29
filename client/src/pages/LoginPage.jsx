import { useAuth } from "../contexts/authContext";

function LoginPage() {
    const { loginGoogle } = useAuth();

    return (
        <div className="flex flex-col h-screen items-center justify-center gap-2">
            <h1 className="font-bold text-xl">File Uploader</h1>
            <button onClick={loginGoogle} className="bg-green-500 rounded p-3 font-bold text-white hover:bg-green-600">Login with Google</button>
        </div>
    )
}

export default LoginPage;