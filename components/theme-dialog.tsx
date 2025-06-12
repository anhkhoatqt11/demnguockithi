"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, Upload, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface ThemeOption {
  id: string
  name: string
  gradient: string
  preview: string
}

export interface BackgroundSettings {
  imageUrl: string
  size: 'cover' | 'contain' | 'auto'
  position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
}

interface ThemeDialogProps {
  themes: ThemeOption[]
  currentTheme: string
  onThemeChange: (themeId: string) => void
  onCustomImageUpload: (imageUrl: string, settings?: BackgroundSettings) => void
}

export function ThemeDialog({ themes, currentTheme, onThemeChange, onCustomImageUpload }: ThemeDialogProps) {
  const [selectedTab, setSelectedTab] = useState("themes")
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState(false)
  
  // Background style settings
  const [backgroundSize, setBackgroundSize] = useState<'cover' | 'contain' | 'auto'>('cover')
  const [backgroundPosition, setBackgroundPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('center')
  const [backgroundRepeat, setBackgroundRepeat] = useState<'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'>('no-repeat')

  // Load saved custom image and settings from localStorage on component mount
  useEffect(() => {
    const savedBackground = localStorage.getItem('thpt-countdown-background')
    const savedSettings = localStorage.getItem('thpt-countdown-background-settings')
    
    if (savedBackground) {
      setImageUrl(savedBackground)
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setBackgroundSize(settings.size || 'cover')
      setBackgroundPosition(settings.position || 'center')
      setBackgroundRepeat(settings.repeat || 'no-repeat')
    }
  }, [])

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
  }
  const handleApplyTheme = () => {
    onThemeChange(selectedTheme)
    // Clear the imageUrl when applying a theme
    setImageUrl("")
    setOpen(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Simulate file upload with FileReader
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageDataUrl = event.target.result.toString()
        setImageUrl(imageDataUrl)
        setIsUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }
  const handleApplyCustomImage = () => {
    if (imageUrl) {
      const settings: BackgroundSettings = {
        imageUrl,
        size: backgroundSize,
        position: backgroundPosition,
        repeat: backgroundRepeat
      }
      
      // Save settings to localStorage
      localStorage.setItem('thpt-countdown-background-settings', JSON.stringify({
        size: backgroundSize,
        position: backgroundPosition,
        repeat: backgroundRepeat
      }))
      
      onCustomImageUpload(imageUrl, settings)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Tùy chỉnh giao diện</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="themes" value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="themes">Chủ đề có sẵn</TabsTrigger>
            <TabsTrigger value="custom">Tải ảnh lên</TabsTrigger>
          </TabsList>

          <TabsContent value="themes" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={cn(
                    "relative rounded-lg overflow-hidden h-32 cursor-pointer transition-all",
                    selectedTheme === theme.id ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-90",
                  )}
                  style={{ background: theme.gradient }}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white font-medium text-sm">{theme.name}</div>
                  </div>
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={handleApplyTheme} className="w-full">
              Áp dụng chủ đề
            </Button>
          </TabsContent>          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Tải ảnh nền lên</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                </div>
              </div>

              {imageUrl && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Cài đặt hiển thị</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bg-size">Kích thước</Label>
                        <Select value={backgroundSize} onValueChange={(value: 'cover' | 'contain' | 'auto') => setBackgroundSize(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kích thước" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cover">Phủ toàn màn hình</SelectItem>
                            <SelectItem value="contain">Vừa khung</SelectItem>
                            <SelectItem value="auto">Kích thước gốc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bg-repeat">Lặp lại</Label>
                        <Select value={backgroundRepeat} onValueChange={(value: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y') => setBackgroundRepeat(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kiểu lặp" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-repeat">Không lặp</SelectItem>
                            <SelectItem value="repeat">Lặp toàn bộ</SelectItem>
                            <SelectItem value="repeat-x">Lặp ngang</SelectItem>
                            <SelectItem value="repeat-y">Lặp dọc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bg-position">Vị trí</Label>
                      <Select value={backgroundPosition} onValueChange={(value: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => setBackgroundPosition(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vị trí" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center">Giữa</SelectItem>
                          <SelectItem value="top">Trên</SelectItem>
                          <SelectItem value="bottom">Dưới</SelectItem>
                          <SelectItem value="left">Trái</SelectItem>
                          <SelectItem value="right">Phải</SelectItem>
                          <SelectItem value="top-left">Trên trái</SelectItem>
                          <SelectItem value="top-right">Trên phải</SelectItem>
                          <SelectItem value="bottom-left">Dưới trái</SelectItem>
                          <SelectItem value="bottom-right">Dưới phải</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Xem trước</Label>
                    <div 
                      className="relative rounded-lg overflow-hidden h-40 border"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: backgroundSize,
                        backgroundPosition: backgroundPosition.replace('-', ' '),
                        backgroundRepeat: backgroundRepeat
                      }}
                    />
                  </div>
                </>
              )}

              <Button onClick={handleApplyCustomImage} disabled={!imageUrl || isUploading} className="w-full">
                {isUploading ? "Đang tải..." : "Áp dụng ảnh nền"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
