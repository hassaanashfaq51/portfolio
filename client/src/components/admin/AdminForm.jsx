import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUpload, FiX } from 'react-icons/fi'
import api, { getErrorMessage } from '../../services/api'

/**
 * Generic admin form component
 * Props:
 * - item: existing item for edit mode
 * - endpoint: API endpoint
 * - fields: array of field definitions
 * - onSuccess: callback
 * - onCancel: callback
 */
export default function AdminForm({ item, endpoint, fields = [], onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previews, setPreviews] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (item) {
      const defaults = {}
      fields.forEach(f => { if (item[f.name] !== undefined) defaults[f.name] = Array.isArray(item[f.name]) ? item[f.name].join(', ') : item[f.name] })
      reset(defaults)
    }
  }, [item, reset, fields])

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      const hasFile = fields.some(f => f.type === 'file' && data[f.name]?.[0])
      let payload

      if (hasFile) {
        payload = new FormData()
        Object.entries(data).forEach(([key, val]) => {
          if (val instanceof FileList) {
            if (val[0]) payload.append(key, val[0])
          } else if (val !== undefined && val !== '') {
            payload.append(key, val)
          }
        })
      } else {
        payload = {}
        fields.forEach(f => {
          if (data[f.name] !== undefined && data[f.name] !== '') {
            if (f.arrayField) {
              payload[f.name] = typeof data[f.name] === 'string'
                ? data[f.name].split(',').map(s => s.trim()).filter(Boolean)
                : data[f.name]
            } else {
              payload[f.name] = data[f.name]
            }
          }
        })
      }

      if (item?.id) {
        await api.put(`${endpoint}/${item.id}`, payload, hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {})
      } else {
        await api.post(endpoint, payload, hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {})
      }
      onSuccess()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleFilePreview = (fieldName, e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviews(prev => ({ ...prev, [fieldName]: url }))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm text-gray-400 mb-1.5">
            {field.label} {field.required && <span className="text-red-400">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              {...register(field.name, { required: field.required && `${field.label} is required` })}
              rows={field.rows || 3}
              placeholder={field.placeholder}
              className={`input resize-none ${errors[field.name] ? 'border-red-500' : ''}`}
            />
          ) : field.type === 'select' ? (
            <select {...register(field.name, { required: field.required && `${field.label} is required` })}
              className={`input ${errors[field.name] ? 'border-red-500' : ''}`}>
              <option value="">Select {field.label}</option>
              {field.options?.map(opt => (
                <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                  {typeof opt === 'string' ? opt : opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'file' ? (
            <div>
              <label className="flex items-center gap-3 cursor-pointer glass border border-white/10 rounded-xl px-4 py-3 hover:border-accent/30 transition-colors">
                <FiUpload size={16} className="text-accent" />
                <span className="text-gray-400 text-sm">{field.placeholder || 'Choose file...'}</span>
                <input
                  {...register(field.name)}
                  type="file"
                  accept={field.accept || 'image/*'}
                  className="hidden"
                  onChange={e => handleFilePreview(field.name, e)}
                />
              </label>
              {(previews[field.name] || (item?.[field.name] && !previews[field.name])) && (
                <div className="mt-2 relative inline-block">
                  <img
                    src={previews[field.name] || item?.[field.name]}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg border border-white/10"
                  />
                </div>
              )}
            </div>
          ) : field.type === 'checkbox' ? (
            <label className="flex items-center gap-3 cursor-pointer">
              <input {...register(field.name)} type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent" />
              <span className="text-gray-400 text-sm">{field.checkboxLabel || field.label}</span>
            </label>
          ) : field.type === 'number' ? (
            <input
              {...register(field.name, { required: field.required && `${field.label} is required`, min: field.min, max: field.max })}
              type="number"
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
              className={`input ${errors[field.name] ? 'border-red-500' : ''}`}
            />
          ) : (
            <input
              {...register(field.name, { required: field.required && `${field.label} is required` })}
              type={field.type || 'text'}
              placeholder={field.placeholder}
              className={`input ${errors[field.name] ? 'border-red-500' : ''}`}
            />
          )}

          {field.hint && <p className="text-gray-600 text-xs mt-1">{field.hint}</p>}
          {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name].message}</p>}
        </div>
      ))}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">{error}</div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary text-sm py-2.5">Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 btn-primary text-sm py-2.5 disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
          {loading ? 'Saving...' : (item ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  )
}
