import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Crear() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    chofer: '',
    fecha: new Date().toISOString().split('T')[0],
    km_ini: '',
    km_fin: '',
    taximetro: '',
    tarjeta: '',
    transferencia: '',
    pmrf: '',
    gasoil: '',
    otros: '',
  })

  const [agencias, setAgencias] = useState([])

  const addAgencia = () => {
    setAgencias([...agencias, { tipo_pago: 'Bizum', origen: '', destino: '', importe: '' }])
  }

  const handleAgenciaChange = (index, e) => {
    const nuevas = [...agencias]
    nuevas[index][e.target.name] = e.target.value
    setAgencias(nuevas)
  }

  const removeAgencia = (index) => {
    setAgencias(agencias.filter((_, i) => i !== index))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.chofer || !form.fecha) {
      alert('Elige chofer y fecha')
      return
    }

    const { data, error } = await supabase
      .from('liquidaciones')
      .insert([form])
      .select()

    if (error) {
      console.error(error)
      alert('Error al guardar')
      return
    }

    const liquidacion_id = data[0].id

    if (agencias.length > 0) {
      const agenciasConId = agencias.map(ag => ({ ...ag, liquidacion_id }))
      const { error: errorAg } = await supabase.from('agencias').insert(agenciasConId)
      if (errorAg) console.error(errorAg)
    }

    alert('Liquidación guardada')
    navigate('/')
  }

  const inputClass = "w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
  const labelClass = "text-gray-400 text-sm mb-1 block"
  const sectionTitle = "text-white font-semibold text-lg mt-6 mb-3"

  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-lg mx-auto">

      <button
        onClick={() => navigate('/')}
        className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold text-white mb-6">Nueva liquidación</h1>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className={labelClass}>Chofer</label>
          <select name="chofer" value={form.chofer} onChange={handleChange} className={inputClass}>
            <option value="">Seleccionar...</option>
            <option value="Roberto">Roberto</option>
            <option value="Óscar">Óscar</option>
          </select>
        </div>
        <div className="flex-1">
          <label className={labelClass}>Fecha</label>
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <h2 className={sectionTitle}>Kilómetros</h2>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className={labelClass}>Km inicio</label>
          <input type="number" name="km_ini" placeholder="0" value={form.km_ini} onChange={handleChange} className={inputClass} />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Km fin</label>
          <input type="number" name="km_fin" placeholder="0" value={form.km_fin} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <h2 className={sectionTitle}>Taxímetro</h2>
      <label className={labelClass}>Cierre taxímetro (€)</label>
      <input type="number" name="taximetro" placeholder="0.00" value={form.taximetro} onChange={handleChange} className={inputClass} />

      <h2 className={sectionTitle}>Cobros</h2>
      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <label className={labelClass}>Tarjeta (€)</label>
          <input type="number" name="tarjeta" placeholder="0.00" value={form.tarjeta} onChange={handleChange} className={inputClass} />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Transferencia (€)</label>
          <input type="number" name="transferencia" placeholder="0.00" value={form.transferencia} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      
      <h2 className={sectionTitle}>Gastos</h2>
        <div className="flex gap-3 mb-3">
        <div className="flex-1">
            <label className={labelClass}>Gasoil (€)</label>
            <input type="number" name="gasoil" placeholder="0.00" value={form.gasoil} onChange={handleChange} className={inputClass} />
        </div>
        <div className="flex-1">
            <label className={labelClass}>PMRF (€)</label>
            <input type="number" name="pmrf" placeholder="0.00" value={form.pmrf} onChange={handleChange} className={inputClass} />
        </div>
        </div>
        <label className={labelClass}>Otros (€)</label>
        <input type="number" name="otros" placeholder="0.00" value={form.otros} onChange={handleChange} className={inputClass} />

      <h2 className={sectionTitle}>Agencias</h2>
      {agencias.map((ag, i) => (
        <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-medium">Agencia {i + 1}</span>
            <button
              onClick={() => removeAgencia(i)}
              className="text-red-400 hover:text-red-300 text-sm transition"
            >
              Eliminar
            </button>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className={labelClass}>Tipo de pago</label>
              <select name="tipo_pago" value={ag.tipo_pago} onChange={(e) => handleAgenciaChange(i, e)} className={inputClass}>
                <option value="Bizum">Bizum</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Cooperativa">Cooperativa</option>
              </select>
            </div>
            <div className="flex-1">
              <label className={labelClass}>Importe (€)</label>
              <input type="number" name="importe" placeholder="0.00" value={ag.importe} onChange={(e) => handleAgenciaChange(i, e)} className={inputClass} />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelClass}>Origen</label>
              <input type="text" name="origen" placeholder="Nombre..." value={ag.origen} onChange={(e) => handleAgenciaChange(i, e)} className={inputClass} />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Destino</label>
              <input type="text" name="destino" placeholder="Nombre..." value={ag.destino} onChange={(e) => handleAgenciaChange(i, e)} className={inputClass} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addAgencia}
        className="w-full border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 py-3 rounded-xl mb-6 transition"
      >
        + Añadir agencia
      </button>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-2xl transition"
      >
        Guardar liquidación
      </button>

      <div className="h-8" />
    </div>
  )
}

export default Crear