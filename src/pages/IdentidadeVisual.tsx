'use client'

import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { useAuth } from '@/context/AuthContext'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Palette, Save, Loader2, Image, FileText, X } from 'lucide-react'

export function IdentidadeVisual() {
  const { user } = useAuth()
  const { identity, updateIdentity } = useStore()
  const isAdmin = user?.role === 'admin'

  const [isSaving, setIsSaving] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(identity?.logo || null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(identity?.favicon || null)
  const [primaryColor, setPrimaryColor] = useState(identity?.primaryColor || '#2563eb')
  const [secondaryColor, setSecondaryColor] = useState(identity?.secondaryColor || '#1e40af')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return
    
    setIsSaving(true)
    try {
      updateIdentity({
        primaryColor,
        secondaryColor,
        logo: logoPreview,
        favicon: faviconPreview,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = (type: 'logo' | 'favicon', file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      if (type === 'logo') setLogoPreview(e.target?.result as string)
      else setFaviconPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveFile = (type: 'logo' | 'favicon') => {
    if (type === 'logo') setLogoPreview(null)
    else setFaviconPreview(null)
  }

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Identidade Visual</h1>
          <p className="text-muted-foreground">
            Personalize a aparência da sua escola no sistema
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Palette className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">Acesso Restrito</h3>
              <p className="mt-2 text-muted-foreground">
                Apenas administradores podem alterar a identidade visual.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Identidade Visual</h1>
        <p className="text-muted-foreground">
          Personalize a aparência da sua escola no sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cores da Marca</CardTitle>
          <CardDescription>
            Defina as cores principais que serão usadas em todo o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="h-12 w-16 p-1 cursor-pointer border rounded"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Cor principal usada em botões, links e destaques
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={e => setSecondaryColor(e.target.value)}
                  className="h-12 w-16 p-1 cursor-pointer border rounded"
                />
                <Input
                  type="text"
                  value={secondaryColor}
                  onChange={e => setSecondaryColor(e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Cor complementar usada em elementos secundários
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pré-visualização das Cores</Label>
            <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-32 rounded-lg border"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="text-sm font-mono text-muted-foreground">Primária</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-32 rounded-lg border"
                  style={{ backgroundColor: secondaryColor }}
                />
                <span className="text-sm font-mono text-muted-foreground">Secundária</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded text-white font-medium text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  Botão Primário
                </button>
                <span className="text-sm font-mono text-muted-foreground">Exemplo</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded text-white font-medium text-sm border-2"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: secondaryColor,
                    color: secondaryColor,
                  }}
                >
                  Botão Secundário
                </button>
                <span className="text-sm font-mono text-muted-foreground">Exemplo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logotipo e Favicon</CardTitle>
          <CardDescription>
            Faça upload do logotipo e favicon da escola (opcional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Logotipo</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {logoPreview ? (
                    <div className="h-20 w-20 rounded-lg border bg-cover bg-center" style={{ backgroundImage: `url(${logoPreview})` }} />
                  ) : (
                    <div className="h-20 w-20 rounded-lg border flex items-center justify-center bg-muted">
                      <Image className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={e => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {logoPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFile('logo')}
                      className="gap-1"
                    >
                      <X className="h-3 w-3" />
                      Remover
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Recomendado: PNG transparente, 200x200px
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {faviconPreview ? (
                    <div className="h-20 w-20 rounded-lg border bg-cover bg-center" style={{ backgroundImage: `url(${faviconPreview})` }} />
                  ) : (
                    <div className="h-20 w-20 rounded-lg border flex items-center justify-center bg-muted">
                      <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={e => e.target.files?.[0] && handleFileUpload('favicon', e.target.files[0])}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {faviconPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFile('favicon')}
                      className="gap-1"
                    >
                      <X className="h-3 w-3" />
                      Remover
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Recomendado: ICO ou PNG, 32x32px ou 16x16px
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}