import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [hero, setHero] = useState(null)
  const [settings, setSettings] = useState(null)
  const [seo, setSeo] = useState(null)
  const [socialLinks, setSocialLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [heroRes, settingsRes, seoRes, socialRes] = await Promise.allSettled([
          api.get('/hero'),
          api.get('/settings'),
          api.get('/seo'),
          api.get('/social'),
        ])
        if (heroRes.status === 'fulfilled') setHero(heroRes.value.data.data)
        if (settingsRes.status === 'fulfilled') setSettings(settingsRes.value.data.data)
        if (seoRes.status === 'fulfilled') setSeo(seoRes.value.data.data)
        if (socialRes.status === 'fulfilled') setSocialLinks(socialRes.value.data.data || [])
      } catch (e) {
        console.warn('Could not load global data')
      } finally {
        setLoading(false)
      }
    }
    fetchGlobalData()
  }, [])

  return (
    <DataContext.Provider value={{ hero, settings, seo, socialLinks, loading }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
