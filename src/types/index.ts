export type EducationStage = 'anos-iniciais' | 'anos-finais' | 'eja'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  schoolId?: string
}

export interface School {
  id: string
  name: string
  code: string
  address: string
  phone: string
  email: string
  primaryColor: string
  secondaryColor: string
}

export interface VisualIdentity {
  primaryColor: string
  secondaryColor: string
  logo?: string | null
  favicon?: string | null
  favicon16?: string | null
}

export interface CurriculumComponent {
  id: string
  name: string
  stage: EducationStage
  workload: number
  durationMin?: number
  isMandatory: boolean
  description?: string
}

export type DurationOption = number

export type CSVRow = Record<string, string>

export interface AppState {
  user: User | null
  isAuthenticated: boolean
  schools: School[]
  currentSchool: School | null
  users: User[]
  components: CurriculumComponent[]
  identity: VisualIdentity
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Omit<User, 'id'>) => Promise<void>
  addSchool: (school: Omit<School, 'id'>) => void
  updateSchool: (id: string, school: Partial<School>) => void
  deleteSchool: (id: string) => void
  setCurrentSchool: (school: School | null) => void
  addComponent: (component: Omit<CurriculumComponent, 'id'>) => void
  updateComponent: (id: string, component: Partial<CurriculumComponent>) => void
  deleteComponent: (id: string) => void
  importCSV: (csv: string) => void
  exportCSV: () => string
  updateIdentity: (identity: Partial<VisualIdentity>) => void
  addUser: (user: Omit<User, 'id'>) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
}
