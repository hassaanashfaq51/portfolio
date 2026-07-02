import AdminCRUD from '../../components/admin/AdminCRUD'
import AdminForm from '../../components/admin/AdminForm'

const fields = [
  { name: 'company', label: 'Company', required: true },
  { name: 'role', label: 'Role / Title', required: true },
  { name: 'type', label: 'Type', type: 'select', options: [
    { value: 'full_time', label: 'Full Time' }, { value: 'part_time', label: 'Part Time' },
    { value: 'freelance', label: 'Freelance' }, { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }, { value: 'remote', label: 'Remote' },
  ]},
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Currently Working Here', type: 'checkbox' },
  { name: 'location', label: 'Location' },
  { name: 'company_url', label: 'Company Website URL' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'responsibilities', label: 'Responsibilities (comma separated)', type: 'textarea', rows: 3, arrayField: true },
  { name: 'technologies', label: 'Technologies (comma separated)', arrayField: true },
  { name: 'company_logo', label: 'Company Logo', type: 'file' },
]

const columns = [
  { key: 'company_logo', label: '', render: (v, item) => v ? <img src={v} alt={item.company} className="w-8 h-8 object-cover rounded" /> : <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{item.company?.[0]}</div> },
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  { key: 'type', label: 'Type', render: v => <span className="tag">{v?.replace('_', ' ')}</span> },
  { key: 'is_current', label: 'Status', render: (v, item) => v ? <span className="text-accent-3 text-xs">● Current</span> : <span className="text-gray-500 text-xs">Ended</span> },
]

const ExperienceForm = (props) => <AdminForm {...props} fields={fields} />

export default function AdminExperience() {
  return <AdminCRUD endpoint="/experience" title="Experience" columns={columns} FormComponent={ExperienceForm} />
}
