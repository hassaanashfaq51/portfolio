import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FiStar } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'

const TestimonialCard = ({ item }) => (
  <div className="glass border border-white/5 rounded-2xl p-6 h-full flex flex-col">
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: item.rating || 5 }).map((_, i) => (
        <FiStar key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6 italic">"{item.review}"</p>
    <div className="flex items-center gap-3">
      {item.avatar ? (
        <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover border-2 border-accent/20" />
      ) : (
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center font-heading font-bold text-sm">
          {item.name?.[0]}
        </div>
      )}
      <div>
        <p className="font-heading font-semibold text-white text-sm">{item.name}</p>
        <p className="text-gray-500 text-xs">{item.role}{item.company ? `, ${item.company}` : ''}</p>
      </div>
    </div>
  </div>
)

export default function TestimonialsSection() {
  const { data: testimonials, loading } = useFetch('/testimonials', { params: { limit: 8 } })

  if (loading || !testimonials?.length) return null

  return (
    <section className="section">
      <div className="text-center mb-12">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-accent font-mono text-sm mb-2">// Client Love</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-title">What People <span className="gradient-text">Say</span></motion.h2>
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-10"
        >
          {testimonials.map(item => (
            <SwiperSlide key={item.id} className="h-auto">
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
