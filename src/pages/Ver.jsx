import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Ver() {
  const navigate = useNavigate()
  const [liquidaciones, setLiquidaciones] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('liquidaciones')
        .select('*')
        .order('fecha', { ascending: false })

      if (error) console.error(error)
      else setLiquidaciones(data)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold text-white mb-6">Liquidaciones</h1>

      {liquidaciones.length === 0 && (
        <p className="text-gray-500 text-center mt-12">No hay liquidaciones aún</p>
      )}

      {liquidaciones.map(liq => (
        <div
          key={liq.id}
          onClick={() => navigate(`/ver/${liq.id}`)}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3 cursor-pointer hover:border-gray-500 transition"
        >
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">{liq.fecha}</span>
            <span className="text-gray-400 text-sm">{liq.chofer}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">Taxímetro: {liq.taximetro} €</p>
        </div>
      ))}
    </div>
  )
}

export default Ver