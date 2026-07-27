'use client'

import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/store/useStore'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/ui/toast'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Palette, Save, Loader2, Image, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react'

function generateFaviconFromLogo(logoDataUrl: string): Promise<{ favicon32: string; favicon16: string }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas32 = document.createElement('canvas')
      canvas32.width = 32
      canvas32.height = 32
      const ctx32 = canvas32.getContext('2d')!
      ctx32.drawImage(img, 0, 0, 32, 32)

      const canvas16 = document.createElement('canvas')
      canvas16.width = 16
      canvas16.height = 16
      const ctx16 = canvas16.getContext('2d')!
      ctx16.drawImage(img, 0, 0, 16, 16)

      resolve({
        favicon32: canvas32.toDataURL('image/png'),
        favicon16: canvas16.toDataURL('image/png'),
      })
    }
    img.src = logoDataUrl
  })
}

export function IdentidadeVisual() {
  const { user } = useAuth()
  const { identity, updateIdentity } = useStore()
  const { toast } = useToast()
  const isAdmin = user?.role === 'admin'

  const [isSaving, setIsSaving] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(identity?.logo || null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(identity?.favicon || null)
  const [favicon16Preview, setFavicon16Preview] = useState<string | null>(identity?.favicon16 || null)
  const [primaryColor, setPrimaryColor] = useState(identity?.primaryColor || '#2563eb')
  const [secondaryColor, setSecondaryColor] = useState(identity?.secondaryColor || '#1e40af')
  const [autoGenerateFavicon, setAutoGenerateFavicon] = useState(true)
  const [generating, setGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)

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
        favicon16: favicon16Preview,
      })
      toast({
        title: 'Sucesso',
        description: 'Identidade visual salva com sucesso',
        variant: 'default',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido')
      return
    }
    const reader = new FileReader()
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string
      setLogoPreview(dataUrl)
      
      if (autoGenerateFavicon) {
        setGenerating(true)
        try {
          const { favicon32, favicon16 } = await generateFaviconFromLogo(dataUrl)
          setFaviconPreview(favicon32)
          setFavicon16Preview(favicon16)
        } catch {
          alert('Erro ao gerar favicon automaticamente')
        } finally {
          setGenerating(false)
        }
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFaviconUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setFaviconPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveFile = (type: 'logo' | 'favicon') => {
    if (type === 'logo') {
      setLogoPreview(null)
      if (autoGenerateFavicon) {
        setFaviconPreview(null)
        setFavicon16Preview(null)
      }
    } else {
      setFaviconPreview(null)
      setFavicon16Preview(null)
    }
  }

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Identidade Visual</h1>
          <p className="text-muted-foreground">Personalize a aparência da sua escola no sistema</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Palette className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">Acesso Restrito</h3>
              <p className="mt-2 text-muted-foreground">Apenas administradores podem alterar a identidade visual.</p>
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
        <p className="text-muted-foreground">Personalize a aparência da sua escola no sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cores da Marca</CardTitle>
          <CardDescription>Defina as cores principais que serão usadas em todo o sistema</CardDescription>
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
              <p className="text-sm text-muted-foreground">Cor principal usada em botões, links e destaques</p>
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
              <p className="text-sm text-muted-foreground">Cor complementar usada em elementos secundários</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pré-visualização das Cores</Label>
            <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-32 rounded-lg border" style={{ backgroundColor: primaryColor }} />
                <span className="text-sm font-mono text-muted-foreground">Primária</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-32 rounded-lg border" style={{ backgroundColor: secondaryColor }} />
                <span className="text-sm font-mono text-muted-foreground">Secundária</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button type="button" className="px-4 py-2 rounded text-white font-medium text-sm" style={{ backgroundColor: primaryColor }}>Botão Primário</button>
                <span className="text-sm font-mono text-muted-foreground">Exemplo</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button type="button" className="px-4 py-2 rounded text-white font-medium text-sm border-2" style={{ backgroundColor: 'transparent', borderColor: secondaryColor, color: secondaryColor }}>Botão Secundário</button>
                <span className="text-sm font-mono text-muted-foreground">Exemplo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logotipo e Favicon</CardTitle>
          <CardDescription>Faça upload do logotipo e favicon da escola (opcional)</CardDescription>
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
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={e => e.target.files?.[0] && handleLogoUpload(e.target.files[0])}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-1"
                  >
                    <Image className="h-3 w-3" />
                    Selecionar
                  </Button>
                  {logoPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveFile('logo')}
                      className="gap-1"
                    >
                      <X className="h-3 w-3" />
                      Remover
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground">Recomendado: PNG transparente, 200x200px</p>
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
                    ref={faviconInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={e => e.target.files?.[0] && handleFaviconUpload(e.target.files[0])}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => faviconInputRef.current?.click()}
                    className="gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    Selecionar
                  </Button>
                  {faviconPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveFile('favicon')}
                      className="gap-1"
                    >
                      <X className="h-3 w-3" />
                      Remover
                    </Button>
                  )}
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoGenerateFavicon}
                      onChange={e => setAutoGenerateFavicon(e.target.checked)}
                      className="rounded border-input"
                    />
                    Gerar favicon automaticamente do logotipo
                  </label>
                  {generating && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                      Gerando favicon...
                    </div>
                  )}
                  {autoGenerateFavicon && logoPreview && !generating && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Favicon gerado (32x32 e 16x16)
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">Recomendado: ICO ou PNG, 32x32px ou 16x16px</p>
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