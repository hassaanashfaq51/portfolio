import AdminCRUD from '../../components/admin/AdminCRUD'
import AdminForm from '../../components/admin/AdminForm'

const fields = [
  { name: 'title', label: 'Title', required: true, placeholder: 'Web Development' },
  { name: 'short_description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary...' },
  { name: 'description', label: 'Full Description', type: 'textarea', rows: 4 },
  { name: 'price', label: 'Price (optional)', placeholder: 'Starting from $500' },
  { name: 'features', label: 'Features (comma separated)', type: 'textarea', rows: 2, arrayField: true, hint: 'e.g. Custom Design, Responsive, SEO Ready' },
  { name: 'technologies', label: 'Technologies (comma separated)', arrayField: true, placeholder: 'React, Node.js, etc' },
  { name: 'cta_text', label: 'CTA Button Text', placeholder: 'Get Started' },
  { name: 'image', label: 'Service Image', type: 'file', accept: 'image/*' },
  { name: 'order_index', label: 'Order', type: 'number', placeholder: '0' },
  { name: 'is_featured', label: 'Featured', type: 'checkbox', checkboxLabel: 'Mark as featured' },
  { name: 'is_active', label: 'Active', type: 'checkbox', checkboxLabel: 'Show on website' },
]

const columns = [
  { key: 'image', label: 'Image', render: (v, item) => v ? <img src={v} alt={item.title} className="w-10 h-8 object-cover rounded" /> : '—' },
  { key: 'title', label: 'Title' },
  { key: 'price', label: 'Price', render: v => v || '—' },
  { key: 'is_featured', label: 'Featured', render: v => v ? '⭐' : '—' },
  { key: 'is_active', label: 'Status', render: v => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-accent-3/10 text-accent-3' : 'bg-gray-500/10 text-gray-500'}`}>{v ? 'Active' : 'Hidden'}</span> },
]

const ServiceForm = (props) => <AdminForm {...props} fields={fields} />

export default function AdminServices() {
  return <AdminCRUD endpoint="/services" title="Services" columns={columns} FormComponent={ServiceForm} params={{ limit: 50 }} />
}
