import AdminCRUD from '../../components/admin/AdminCRUD'
import AdminForm from '../../components/admin/AdminForm'

const fields = [
  { name: 'name', label: 'Client Name', required: true },
  { name: 'role', label: 'Role / Title' },
  { name: 'company', label: 'Company' },
  { name: 'review', label: 'Review', type: 'textarea', required: true, rows: 4 },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5, placeholder: '5' },
  { name: 'project_name', label: 'Project Name' },
  { name: 'avatar', label: 'Client Photo', type: 'file' },
  { name: 'order_index', label: 'Order', type: 'number', placeholder: '0' },
  { name: 'is_featured', label: 'Featured', type: 'checkbox' },
  { name: 'is_active', label: 'Active', type: 'checkbox', checkboxLabel: 'Show on website' },
]

const Stars = ({ n }) => '⭐'.repeat(Math.min(n || 5, 5))

const columns = [
  { key: 'avatar', label: '', render: (v, item) => v ? <img src={v} alt={item.name} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{item.name?.[0]}</div> },
  { key: 'name', label: 'Client' },
  { key: 'company', label: 'Company', render: v => v || '—' },
  { key: 'rating', label: 'Rating', render: v => <Stars n={v} /> },
  { key: 'review', label: 'Review', render: v => <span className="text-gray-400 text-xs line-clamp-1 max-w-[200px] block">{v}</span> },
  { key: 'is_active', label: 'Status', render: v => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-accent-3/10 text-accent-3' : 'bg-gray-500/10 text-gray-500'}`}>{v ? 'Active' : 'Hidden'}</span> },
]

const TestimonialForm = (props) => <AdminForm {...props} fields={fields} />

export default function AdminTestimonials() {
  return <AdminCRUD endpoint="/testimonials" title="Testimonials" columns={columns} FormComponent={TestimonialForm} />
}
