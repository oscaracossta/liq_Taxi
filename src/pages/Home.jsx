import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 gap-4">
        <h1 className="text-2xl font-bold mb-8 text-white">Liquidación Taxi</h1>

        <button
            onClick={() => navigate('/crear')}
            className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-6 rounded-2xl shadow-lg transition"
            >
            + Crear liquidación
            </button>

            <button
            onClick={() => navigate('/ver')}
            className="w-full max-w-sm bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-medium py-6 rounded-2xl shadow-lg transition"
            >
            📋 Ver liquidaciones
        </button>
    </div>
  )
}

export default Home