import { useState } from 'react'
import Simple from './components/Simple'

function App() {
  const [refresh, setRefresh] = useState(false)
  const onSearch = () => setRefresh(!refresh);
  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center bg-[#303030]">
        <h1 className="text-4xl font-bold mb-8 text-white">
            Market Viewer
        </h1>

        <div className="bg-[#282828] p-8 rounded-xl shadow-lg flex flex-col gap-10 items-center">
          <Simple onSearch={onSearch} />
        </div>
    </main>
);
}

export default App
