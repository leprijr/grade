'use client'

import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { useAuth } from '@/context/AuthContext'
import {
  Card, CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Building, Users, Phone, Mail, Loader2 } from 'lucide-react'

export function Escolas() {
  const { schools, currentSchool, addSchool, updateSchool, deleteSchool, setCurrentSchool } = useStore()
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<typeof schools[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formState = {
    name: '',
    code: '',
    address: '',
    phone: '',
    email: '',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
  }
  const [form, setForm] = useState(formState)

  const handleOpenCreate = () => {
    setEditingSchool(null)
    setForm(formState)
    setIsDialogOpen(true)
  }

  const handleEdit = (school: typeof schools[0]) => {
    setEditingSchool(school)
    setForm({
      name: school.name,
      code: school.code,
      address: school.address,
      phone: school.phone,
      email: school.email,
      primaryColor: school.primaryColor,
      secondaryColor: school.secondaryColor,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingSchool) {
        updateSchool(editingSchool.id, form)
      } else {
        addSchool(form)
      }
      setIsDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta escola?')) {
      deleteSchool(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Escolas</h1>
          <p className="text-muted-foreground">Gerencie as escolas do sistema</p>
        </div>
        {isAdmin && (
          <Button onClick={handleOpenCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Escola
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Escola</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="hidden md:table-cell">Endereço</TableHead>
                <TableHead className="hidden lg:table-cell">Contato</TableHead>
                <TableHead className="hidden lg:table-cell">Cores</TableHead>
                <TableHead className="w-[120px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Building className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">Nenhuma escola cadastrada</p>
                    {isAdmin && (
                      <Button variant="link" onClick={handleOpenCreate} className="mt-2">
                        Criar primeira escola
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                schools.map(school => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: school.primaryColor }}
                        >
                          {school.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{school.name}</p>
                          {currentSchool?.id === school.id && (
                            <Badge variant="default" className="text-xs">Atual</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{school.code}</TableCell>
                    <TableCell className="hidden md:table-cell">{school.address}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {school.phone}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {school.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded border"
                          style={{ backgroundColor: school.primaryColor }}
                          title="Cor primária"
                        />
                        <div
                          className="h-6 w-6 rounded border"
                          style={{ backgroundColor: school.secondaryColor }}
                          title="Cor secundária"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(school)}
                          className="h-8 w-8"
                          disabled={!isAdmin}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setCurrentSchool(school)}
                          className="h-8 w-8"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(school.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
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
            <DialogTitle>{editingSchool ? 'Editar Escola' : 'Nova Escola'}</DialogTitle>
            <DialogDescription>
              Preencha os dados da escola
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código *</Label>
                  <Input
                    id="code"
                    value={form.code}
                    onChange={e => setForm(prev => ({ ...prev, code: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço *</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={form.primaryColor}
                    onChange={e => setForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="h-10 w-full p-1 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={form.secondaryColor}
                    onChange={e => setForm(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="h-10 w-full p-1 cursor-pointer"
                  />
                </div>
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
    </div>
  )
}