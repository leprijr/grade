'use client'

import { useState } from 'react'
import { useStore, EDUCATION_STAGES, DURATION_OPTIONS, getDurationLegend } from '@/store/useStore'
import { useAuth } from '@/context/AuthContext'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus, Edit, Trash2, Download, Upload, FileText,
  Loader2,
} from 'lucide-react'
import { parseCSVFile, downloadFile } from '@/lib/utils'
import type { CurriculumComponent, EducationStage } from '@/types'

const STAGE_LABELS: Record<EducationStage, string> = {
  'anos-iniciais': 'Anos Iniciais',
  'anos-finais': 'Anos Finais',
  'eja': 'EJA',
}
 
export function MatrizCurricular() {
  const { user } = useAuth()
  const { components, addComponent, updateComponent, deleteComponent, exportCSV, importCSV } = useStore()
  const isAdmin = user?.role === 'admin'

  const [selectedStage, setSelectedStage] = useState<EducationStage>('anos-iniciais')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingComponent, setEditingComponent] = useState<CurriculumComponent | null>(null)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultFormState = {
    name: '',
    stage: selectedStage,
    workload: 0,
    durationMin: '',
    isMandatory: true,
    description: '',
  }
  const [form, setForm] = useState(defaultFormState)

  const filteredComponents = components
    .filter(c => c.stage === selectedStage)
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getDuracaoAula = (component: CurriculumComponent): number => {
    if (component.durationMin) return component.durationMin
    const defaults: Record<EducationStage, Record<string, number>> = {
      'anos-iniciais': { 'Arte': 50, 'Inglês': 50, 'Educação Física': 50, 'Inovação e Tecnologia': 50 },
      'anos-finais': {},
      'eja': {},
    }
    const stageDefault = { 'anos-iniciais': 60, 'anos-finais': 50, 'eja': 40 }[component.stage]
    return defaults[component.stage]?.[component.name] ?? stageDefault
  }

  const handleOpenCreate = () => {
    setEditingComponent(null)
    setForm({ ...defaultFormState, stage: selectedStage })
    setIsDialogOpen(true)
  }

  const handleEdit = (component: CurriculumComponent) => {
    setEditingComponent(component)
    setForm({
      name: component.name,
      stage: component.stage,
      workload: component.workload,
      durationMin: component.durationMin?.toString() || '',
      isMandatory: component.isMandatory,
      description: component.description || '',
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const data = {
        name: form.name,
        stage: form.stage,
        workload: form.workload,
        durationMin: form.durationMin ? Number(form.durationMin) : undefined,
        isMandatory: form.isMandatory,
        description: form.description,
      }

      if (editingComponent) {
        updateComponent(editingComponent.id, data)
      } else {
        addComponent(data)
      }
      setIsDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este componente?')) {
      deleteComponent(id)
    }
  }

  const handleExport = () => {
    const csv = exportCSV()
    downloadFile(csv, `matriz-curricular-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')
  }

  const handleImport = async () => {
    if (!importFile) return
    setIsImporting(true)
    try {
      const csv = await parseCSVFile(importFile)
      importCSV(csv)
      setIsImportDialogOpen(false)
      setImportFile(null)
    } catch {
      alert('Erro ao importar arquivo CSV')
    } finally {
      setIsImporting(false)
    }
  }

  const getDefaultDuration = (stage: EducationStage, name: string): number => {
    const specificDefaults: Record<EducationStage, Record<string, number>> = {
      'anos-iniciais': { 'Arte': 50, 'Inglês': 50, 'Educação Física': 50, 'Inovação e Tecnologia': 50 },
      'anos-finais': {},
      'eja': {},
    }
    const stageDefaults: Record<EducationStage, number> = {
      'anos-iniciais': 60,
      'anos-finais': 50,
      'eja': 40,
    }
    return specificDefaults[stage]?.[name] ?? stageDefaults[stage]
  }

  const handleStageChange = (stage: EducationStage) => {
    setForm(prev => ({
      ...prev,
      stage,
      durationMin: getDefaultDuration(stage, form.name).toString(),
    }))
  }

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      durationMin: getDefaultDuration(prev.stage, name).toString(),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matriz Curricular</h1>
          <p className="text-muted-foreground">Gerencie os componentes curriculares por etapa de ensino</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <Button onClick={handleOpenCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Componente
            </Button>
          )}
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          {isAdmin && (
            <Button variant="outline" onClick={() => setIsImportDialogOpen(true)} className="gap-2">
              <Upload className="h-4 w-4" />
              Importar CSV
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">
            {STAGE_LABELS[selectedStage]} ({filteredComponents.length} componentes)
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_STAGES.map(stage => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Buscar componente..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-[250px]"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            {getDurationLegend(selectedStage)}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Componente</TableHead>
                <TableHead className="hidden md:table-cell">Carga Horária</TableHead>
                <TableHead className="hidden lg:table-cell">Duração da Aula</TableHead>
                <TableHead className="hidden md:table-cell">Obrigatório</TableHead>
                {isAdmin && <TableHead className="w-[100px]">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComponents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">Nenhum componente encontrado</p>
                    {isAdmin && (
                      <Button variant="link" onClick={handleOpenCreate} className="mt-2">
                        Criar primeiro componente
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredComponents.map(component => (
                  <TableRow key={component.id}>
                    <TableCell className="font-medium">{component.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{component.workload}h</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="secondary" className="gap-1">
                        {getDuracaoAula(component)} min
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {component.isMandatory ? (
                        <Badge variant="default" className="gap-1">
                          Sim
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          Não
                        </Badge>
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(component)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(component.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingComponent ? 'Editar Componente' : 'Novo Componente'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do componente curricular
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nome do Componente *</label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={e => handleNameChange(e.target.value)}
                  placeholder="Ex: Língua Portuguesa"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="stage" className="text-sm font-medium">Etapa de Ensino *</label>
                <Select value={form.stage} onValueChange={handleStageChange}>
                  <SelectTrigger id="stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_STAGES.map(stage => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="workload" className="text-sm font-medium">Carga Horária Anual *</label>
                  <Input
                    id="workload"
                    type="number"
                    min="1"
                    value={form.workload}
                    onChange={e => setForm(prev => ({ ...prev, workload: Number(e.target.value) || 0 }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="durationMin" className="text-sm font-medium">Duração da Aula (min) *</label>
                  <Select value={form.durationMin} onValueChange={v => setForm(prev => ({ ...prev, durationMin: v }))}>
                    <SelectTrigger id="durationMin">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map(min => (
                        <SelectItem key={min} value={min.toString()}>
                          {min} min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={form.isMandatory}
                    onChange={e => setForm(prev => ({ ...prev, isMandatory: e.target.checked }))}
                    className="rounded border-input"
                  />
                  Componente Obrigatório
                </label>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Descrição</label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição opcional do componente"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar CSV</DialogTitle>
            <DialogDescription>
              Selecione um arquivo CSV com os componentes curriculares.
              Colunas esperadas: id, name, stage, workload, durationMin, isMandatory, description
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arquivo CSV</label>
              <input
                type="file"
                accept=".csv"
                onChange={e => setImportFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
              {importFile && <p className="text-sm text-muted-foreground">{importFile.name}</p>}
            </div>
            <div className="rounded-lg border p-4 bg-muted/50 text-sm">
              <p className="font-medium mb-2">Formato esperado:</p>
<pre className="font-mono text-xs overflow-x-auto">
{"id,name,stage,workload,durationMin,isMandatory,description\n1,Língua Portuguesa,anos-iniciais,200,60,true,\n2,Inovação e Tecnologia,anos-iniciais,50,50,true,"}
</pre>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={isImporting || !importFile}>
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando...
                </>
              ) : (
                'Importar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}