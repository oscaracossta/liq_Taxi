import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [liq, setLiq] = useState(null)
  const [agencias, setAgencias] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: liqData } = await supabase
        .from('liquidaciones')
        .select('*')
        .eq('id', id)
        .single()

      const { data: agData } = await supabase
        .from('agencias')
        .select('*')
        .eq('liquidacion_id', id)

      setLiq(liqData)
      setAgencias(agData || [])
    }

    fetchData()
  }, [id])

  if (!liq) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-gray-400">Cargando...</p>
    </div>
  )

  const sectionTitle = "text-white font-semibold text-lg mt-6 mb-3"
  const dataRow = "flex justify-between py-2 border-b border-gray-700"
  const dataLabel = "text-gray-400 text-sm"
  const dataValue = "text-white text-sm font-medium"

  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/ver')}
        className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold text-white">{liq.chofer}</h1>
      <p className="text-gray-400 mb-6">{liq.fecha}</p>

      <h2 className={sectionTitle}>Kilómetros</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <div className={dataRow}><span className={dataLabel}>Inicio</span><span className={dataValue}>{liq.km_ini} km</span></div>
        <div className={dataRow}><span className={dataLabel}>Fin</span><span className={dataValue}>{liq.km_fin} km</span></div>
        <div className="flex justify-between pt-2"><span className={dataLabel}>Recorridos</span><span className="text-blue-400 text-sm font-semibold">{liq.km_fin - liq.km_ini} km</span></div>
      </div>

      <h2 className={sectionTitle}>Taxímetro</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <div className={dataRow}><span className={dataLabel}>Total cierre</span><span className={dataValue}>{liq.taximetro} €</span></div>
        <div className={dataRow}><span className={dataLabel}>Chofer (40%)</span><span className="text-blue-400 text-sm font-semibold">{(liq.taximetro * 0.4).toFixed(2)} €</span></div>
        <div className="flex justify-between pt-2"><span className={dataLabel}>Patrón (60%)</span><span className="text-emerald-400 text-sm font-semibold">{(liq.taximetro * 0.6).toFixed(2)} €</span></div>
      </div>

      <h2 className={sectionTitle}>Cobros</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <div className={dataRow}><span className={dataLabel}>Tarjeta</span><span className={dataValue}>{liq.tarjeta} €</span></div>
        <div className={dataRow}><span className={dataLabel}>Transferencia</span><span className={dataValue}>{liq.transferencia} €</span></div>
        <div className="flex justify-between pt-2"><span className={dataLabel}>PMRF</span><span className={dataValue}>{liq.pmrf} €</span></div>
      </div> 

      <h2 className={sectionTitle}>Gastos</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className={dataRow}><span className={dataLabel}>Gasoil</span><span className={dataValue}>{liq.gasoil} €</span></div>
            <div className={dataRow}><span className={dataLabel}>PMRF</span><span className={dataValue}>{liq.pmrf} €</span></div>
            <div className="flex justify-between pt-2"><span className={dataLabel}>Otros</span><span className={dataValue}>{liq.otros} €</span></div>
        </div>

      <h2 className={sectionTitle}>Agencias</h2>
      {agencias.length === 0 && <p className="text-gray-500 text-sm">Sin agencias</p>}
      {agencias.map(ag => (
        <div key={ag.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium text-sm">{ag.origen} → {ag.destino}</span>
            <span className="text-emerald-400 font-semibold text-sm">{ag.importe} €</span>
          </div>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{ag.tipo_pago}</span>
        </div>
      ))}

      <div className="h-8" />
    </div>
  )
}

export default Detalle