import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  User,
  School,
  VisualIdentity,
  EducationStage,
  CurriculumComponent,
  DurationOption,
  CSVRow,
  AppState,
} from '../types'

const DEFAULT_VISUAL_IDENTITY: VisualIdentity = {
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
}

const DEFAULT_SCHOOLS: School[] = [
  {
    id: '1',
    name: 'Escola Municipal Exemplo',
    code: 'EME001',
    address: 'Rua das Flores, 123',
    phone: '(11) 99999-9999',
    email: 'contato@eme001.com.br',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
  },
]

const DEFAULT_USERS: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@escola.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Professor João',
    email: 'professor@escola.com',
    role: 'user',
    schoolId: '1',
  },
]

const DEFAULT_COMPONENTS: CurriculumComponent[] = [
  { id: '1', name: 'Língua Portuguesa', stage: 'anos-iniciais', workload: 200, durationMin: 60, isMandatory: true, description: 'Língua Portuguesa' },
  { id: '2', name: 'Matemática', stage: 'anos-iniciais', workload: 200, durationMin: 60, isMandatory: true, description: 'Matemática' },
  { id: '3', name: 'Ciências', stage: 'anos-iniciais', workload: 100, durationMin: 60, isMandatory: true, description: 'Ciências' },
  { id: '4', name: 'História', stage: 'anos-iniciais', workload: 100, durationMin: 60, isMandatory: true, description: 'História' },
  { id: '5', name: 'Geografia', stage: 'anos-iniciais', workload: 100, durationMin: 60, isMandatory: true, description: 'Geografia' },
  { id: '6', name: 'Arte', stage: 'anos-iniciais', workload: 100, durationMin: 50, isMandatory: true, description: 'Arte' },
  { id: '7', name: 'Inglês', stage: 'anos-iniciais', workload: 100, durationMin: 50, isMandatory: true, description: 'Inglês' },
  { id: '8', name: 'Educação Física', stage: 'anos-iniciais', workload: 100, durationMin: 50, isMandatory: true, description: 'Educação Física' },
  { id: '9', name: 'Inovação e Tecnologia', stage: 'anos-iniciais', workload: 50, durationMin: 50, isMandatory: true, description: 'Inovação e Tecnologia' },
  { id: '10', name: 'Língua Portuguesa', stage: 'anos-finais', workload: 200, durationMin: 50, isMandatory: true, description: 'Língua Portuguesa' },
  { id: '11', name: 'Matemática', stage: 'anos-finais', workload: 200, durationMin: 50, isMandatory: true, description: 'Matemática' },
  { id: '12', name: 'Ciências', stage: 'anos-finais', workload: 100, durationMin: 50, isMandatory: true, description: 'Ciências' },
  { id: '13', name: 'História', stage: 'anos-finais', workload: 100, durationMin: 50, isMandatory: true, description: 'História' },
  { id: '13', name: 'Geografia', stage: 'anos-finais', workload: 100, durationMin: 50, isMandatory: true, description: 'Geografia' },
  { id: '14', name: 'Arte', stage: 'anos-finais', workload: 50, durationMin: 50, isMandatory: true, description: 'Arte' },
  { id: '15', name: 'Inglês', stage: 'anos-finais', workload: 50, durationMin: 50, isMandatory: true, description: 'Inglês' },
  { id: '16', name: 'Educação Física', stage: 'anos-finais', workload: 100, durationMin: 50, isMandatory: true, description: 'Educação Física' },
  { id: '17', name: 'Inovação e Tecnologia', stage: 'anos-finais', workload: 50, durationMin: 50, isMandatory: true, description: 'Inovação e Tecnologia' },
  { id: '18', name: 'Língua Portuguesa', stage: 'eja', workload: 200, durationMin: 40, isMandatory: true, description: 'Língua Portuguesa' },
  { id: '19', name: 'Matemática', stage: 'eja', workload: 200, durationMin: 40, isMandatory: true, description: 'Matemática' },
  { id: '20', name: 'Ciências da Natureza', stage: 'eja', workload: 100, durationMin: 40, isMandatory: true, description: 'Ciências da Natureza' },
  { id: '21', name: 'Ciências Humanas', stage: 'eja', workload: 100, durationMin: 40, isMandatory: true, description: 'Ciências Humanas' },
  { id: '22', name: 'Inovação e Tecnologia', stage: 'eja', workload: 50, durationMin: 40, isMandatory: true, description: 'Inovação e Tecnologia' },
]

const getDefaultDuration = (stage: EducationStage, name: string): DurationOption => {
  const stageDefaults = DEFAULT_DURATION_BY_STAGE_DEFAULT[stage]
  const specificDefaults = {
    'anos-iniciais': {
      'Arte': 50,
      'Inglês': 50,
      'Educação Física': 50,
      'Inovação e Tecnologia': 50,
    },
    'anos-finais': {},
    'eja': {},
  } as Record<EducationStage, Record<string, DurationOption>>

  return specificDefaults[stage]?.[name] ?? stageDefaults
}

const parseCSV = (csv: string): CSVRow[] => {
  const lines = csv.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim())
    const row: Record<string, string> = {}
    headers.forEach((header, i) => {
      row[header] = values[i] || ''
    })
    return row as unknown as CSVRow
  })
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      schools: DEFAULT_SCHOOLS,
      currentSchool: DEFAULT_SCHOOLS[0],
      users: DEFAULT_USERS,
      components: DEFAULT_COMPONENTS,
      identity: DEFAULT_VISUAL_IDENTITY,

      login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        const user = get().users.find(u => u.email === email)
        if (user && password === '123456') {
          set({ user, isAuthenticated: true })
        } else {
          throw new Error('Credenciais inválidas')
        }
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      register: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newUser: User = { ...userData, id: generateId() }
        set(state => ({ users: [...state.users, newUser] }))
      },

      addSchool: (school) => {
        const newSchool: School = { ...school, id: generateId() }
        set(state => ({ schools: [...state.schools, newSchool] }))
      },

      updateSchool: (id, school) => {
        set(state => ({
          schools: state.schools.map(s => s.id === id ? { ...s, ...school } : s),
          currentSchool: state.currentSchool?.id === id ? { ...state.currentSchool, ...school } : state.currentSchool,
        }))
      },

      deleteSchool: (id) => {
        set(state => ({
          schools: state.schools.filter(s => s.id !== id),
          currentSchool: state.currentSchool?.id === id ? null : state.currentSchool,
        }))
      },

      setCurrentSchool: (school) => set({ currentSchool: school }),

      addComponent: (component) => {
        const newComponent: CurriculumComponent = {
          ...component,
          id: generateId(),
          durationMin: component.durationMin ?? getDefaultDuration(component.stage, component.name),
        }
        set(state => ({ components: [...state.components, newComponent] }))
      },

      updateComponent: (id, component) => {
        set(state => ({
          components: state.components.map(c => c.id === id ? { ...c, ...component } : c),
        }))
      },

      deleteComponent: (id) => {
        set(state => ({ components: state.components.filter(c => c.id !== id) }))
      },

      importCSV: (csv) => {
        const rows = parseCSV(csv)
        const newComponents: CurriculumComponent[] = rows.map(row => ({
          id: row.id || generateId(),
          name: row.name,
          stage: row.stage,
          workload: Number(row.workload),
          durationMin: row.durationMin ? Number(row.durationMin) : getDefaultDuration(row.stage, row.name),
          isMandatory: row.isMandatory === 'true' || row.isMandatory === true,
          description: row.description,
        }))
        set(state => ({ components: [...state.components, ...newComponents] }))
      },

      exportCSV: () => {
        const { components } = get()
        const headers = ['id', 'name', 'stage', 'workload', 'durationMin', 'isMandatory', 'description']
        const rows = components.map(c => [
          c.id,
          c.name,
          c.stage,
          c.workload.toString(),
          (c.durationMin ?? '').toString(),
          c.isMandatory.toString(),
          c.description || '',
        ].map(v => `"${v}"`).join(','))
        return [headers.join(','), ...rows].join('\n')
      },

      updateIdentity: (identity) => {
        set(state => ({ identity: { ...state.identity, ...identity } }))
      },

      addUser: (user) => {
        const newUser: User = { ...user, id: generateId() }
        set(state => ({ users: [...state.users, newUser] }))
      },

      updateUser: (id, user) => {
        set(state => ({
          users: state.users.map(u => u.id === id ? { ...u, ...user } : u),
        }))
      },

      deleteUser: (id) => {
        set(state => ({ users: state.users.filter(u => u.id !== id) }))
      },
    }),
    {
      name: 'grade-escolar-store',
      version: 2,
    }
  )
)

export const getDuracaoAula = (component: CurriculumComponent): number => {
  if (component.durationMin) return component.durationMin
  return getDefaultDuration(component.stage, component.name)
}

export const getStageLabel = (stage: EducationStage): string => {
  const labels: Record<EducationStage, string> = {
    'anos-iniciais': 'Anos Iniciais',
    'anos-finais': 'Anos Finais',
    'eja': 'EJA',
  }
  return labels[stage]
}

export const getDurationLegend = (stage: EducationStage): string => {
  const legends: Record<EducationStage, string> = {
    'anos-iniciais': 'Padrão: 60 min (Arte, Inglês, Ed. Física, Inovação e Tecnologia: 50 min)',
    'anos-finais': 'Padrão: 50 min para todos os componentes',
    'eja': 'Padrão: 40 min para todos os componentes',
  }
  return legends[stage]
}

export const EDUCATION_STAGES = [
  { value: 'anos-iniciais' as EducationStage, label: 'Anos Iniciais' },
  { value: 'anos-finais' as EducationStage, label: 'Anos Finais' },
  { value: 'eja' as EducationStage, label: 'EJA' },
]

export const DURATION_OPTIONS = [30, 40, 45, 50, 55, 60, 75, 90, 100, 120]