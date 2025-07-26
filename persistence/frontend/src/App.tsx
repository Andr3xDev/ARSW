import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

const App: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleStudentAdded = () => setRefresh(!refresh);

    return (
        <main className="flex flex-col w-screen h-screen items-center justify-center bg-[#303030]">
            <h1 className="text-4xl font-bold mb-8 text-white">
                Students Register
            </h1>

            <div className="bg-[#282828] p-8 rounded-xl shadow-lg flex flex-col gap-10 items-center">
                <UserForm onStudentAdded={handleStudentAdded} />
                <UserTable refresh={refresh} />
            </div>
        </main>
    );
};

export default App;
