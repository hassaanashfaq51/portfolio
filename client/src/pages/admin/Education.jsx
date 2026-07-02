import AdminCRUD from '../../components/admin/AdminCRUD'
import AdminForm from '../../components/admin/AdminForm'

const fields = [
  { name: 'degree', label: 'Degree', required: true, placeholder: 'Bachelor of Science' },
  { name: 'institute', label: 'Institute', required: true, placeholder: 'University Name' },
  { name: 'field_of_study', label: 'Field of Study', placeholder: 'Computer Science' },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Currently Studying', type: 'checkbox' },
  { name: 'grade', label: 'Grade / GPA', placeholder: '3.8/4.0' },
  { name: 'location', label: 'Location', placeholder: 'New York, USA' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'achievements', label: 'Achievements (comma separated)', type: 'textarea', rows: 2, arrayField: true },
  { name: 'image', label: 'Institute Logo', type: 'file' },
]

const columns = [
  { key: 'image', label: 'Logo', render: (v, item) => v ? <img src={v} alt={item.institute} className="w-8 h-8 object-cover rounded" /> : '—' },
  { key: 'degree', label: 'Degree' },
  { key: 'institute', label: 'Institute' },
  { key: 'start_date', label: 'Period', render: (v, item) => {
    const s = v ? new Date(v).getFullYear() : '?'
    const e = item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).getFullYear() : '?'
    return `${s} — ${e}`
  }},
  { key: 'grade', label: 'Grade', render: v => v || '—' },
]

const EducationForm = (props) => <AdminForm {...props} fields={fields} />

export default function AdminEducation() {
  return <AdminCRUD endpoint="/education" title="Education" columns={columns} FormComponent={EducationForm} />
}
