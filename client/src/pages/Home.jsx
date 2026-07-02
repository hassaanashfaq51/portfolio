import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import FeaturedServices from '../components/sections/FeaturedServices'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ContactCTA from '../components/sections/ContactCTA'
import { useEffect } from 'react'
import { useData } from '../context/DataContext'

export default function Home() {
  const { seo } = useData()

  useEffect(() => {
    if (seo?.meta_title) document.title = seo.meta_title
    const desc = document.querySelector('meta[name="description"]')
    if (desc && seo?.meta_description) desc.content = seo.meta_description
  }, [seo])

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <FeaturedServices />
      <TestimonialsSection />
      <ContactCTA />
    </>
  )
}
