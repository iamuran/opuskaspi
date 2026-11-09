import { IdCard, BookUser, GraduationCap, FileText, type LucideIcon } from 'lucide-react'

export type DocType = 'id' | 'passport' | 'diploma' | 'certificates'

export interface FieldDef { key: string; label: string; type?: 'text' | 'date' }

export interface DocTypeDef {
  type: DocType
  title: string
  subtitle: string
  icon: LucideIcon
  fields: FieldDef[]
}

export const DOC_TYPES: DocTypeDef[] = [
  {
    type: 'id',
    title: 'Удостоверение личности',
    subtitle: 'Копия удостоверения',
    icon: IdCard,
    fields: [
      { key: 'fullName', label: 'ФИО' },
      { key: 'iin', label: 'ИИН' },
      { key: 'birthDate', label: 'Дата рождения', type: 'date' },
      { key: 'number', label: 'Номер документа' },
      { key: 'issueDate', label: 'Дата выдачи', type: 'date' },
      { key: 'expiryDate', label: 'Срок действия', type: 'date' },
    ],
  },
  {
    type: 'passport',
    title: 'Паспорт гражданина РК',
    subtitle: 'Копия паспорта',
    icon: BookUser,
    fields: [
      { key: 'fullName', label: 'ФИО' },
      { key: 'latinName', label: 'ФИО латиницей' },
      { key: 'iin', label: 'ИИН' },
      { key: 'birthDate', label: 'Дата рождения', type: 'date' },
      { key: 'number', label: 'Номер паспорта' },
      { key: 'issuedBy', label: 'Орган выдачи' },
      { key: 'issueDate', label: 'Дата выдачи', type: 'date' },
      { key: 'expiryDate', label: 'Срок действия', type: 'date' },
    ],
  },
  {
    type: 'diploma',
    title: 'Диплом',
    subtitle: 'Копия диплома об образовании',
    icon: GraduationCap,
    fields: [
      { key: 'fullName', label: 'ФИО' },
      { key: 'institution', label: 'Учебное заведение' },
      { key: 'specialty', label: 'Специальность' },
      { key: 'degree', label: 'Степень / квалификация' },
      { key: 'number', label: 'Серия и номер диплома' },
      { key: 'issueDate', label: 'Дата выдачи', type: 'date' },
    ],
  },
  {
    type: 'certificates',
    title: 'Справки',
    subtitle: 'Социальные, медицинские и другие',
    icon: FileText,
    fields: [
      { key: 'title', label: 'Название справки' },
      { key: 'issuedBy', label: 'Кем выдана' },
      { key: 'number', label: 'Номер' },
      { key: 'issueDate', label: 'Дата выдачи', type: 'date' },
    ],
  },
]

export const getDocType = (t: DocType) => DOC_TYPES.find((d) => d.type === t)!
