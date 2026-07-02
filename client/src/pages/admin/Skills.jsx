import AdminCRUD from '../../components/admin/AdminCRUD'
import AdminForm from '../../components/admin/AdminForm'

const fields = [
  { name: 'name', label: 'Skill Name', required: true, placeholder: 'e.g. React.js' },
  { name: 'category', label: 'Category', type: 'select', required: true, options: [
    { value: 'frontend', label: 'Frontend' }, { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' }, { value: 'tools', label: 'Tools' },
    { value: 'soft_skills', label: 'Soft Skills' }, { value: 'other', label: 'Other' },
  ]},
  { name: 'proficiency', label: 'Proficiency (%)', type: 'number', required: true, min: 0, max: 100, placeholder: '85' },
  { name: 'years_of_experience', label: 'Years of Experience', type: 'number', min: 0, placeholder: '2' },
  { name: 'icon', label: 'Icon (emoji or class)', placeholder: '⚛️' },
  { name: 'color', label: 'Color (hex)', placeholder: '#61DAFB' },
  { name: 'order_index', label: 'Order', type: 'number', placeholder: '0' },
  { name: 'is_featured', label: 'Featured', type: 'checkbox', checkboxLabel: 'Mark as featured skill' },
]

const columns = [
  { key: 'name', label: 'Skill' },
  { key: 'category', label: 'Category', render: v => <span className="tag capitalize">{v}</span> },
  { key: 'proficiency', label: 'Proficiency', render: v => (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-white/10 rounded-full"><div className="h-full bg-accent rounded-full" style={{ width: `${v}%` }} /></div>
      <span className="text-xs text-gray-400">{v}%</span>
    </div>
  )},
  { key: 'years_of_experience', label: 'Experience', render: v => v ? `${v} yr` : '—' },
  { key: 'is_featured', label: 'Featured', render: v => v ? '⭐' : '—' },
]

const SkillForm = (props) => <AdminForm {...props} fields={fields} />

export default function AdminSkills() {
  return <AdminCRUD endpoint="/skills" title="Skills" columns={columns} FormComponent={SkillForm} params={{ limit: 100 }} />
}
