"use client";

export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
        <div className="p-6 m-4 bg-gray-900 rounded-2xl shadow-lg w-80">
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            <div className="mb-4">
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            <button 
                onClick={() => { }} 
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
                {isSignin ? "Sign in" : "Sign up"}
            </button>
        </div>
    </div>
    

    )
}