"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2, Check, Sun, Moon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { type ThemeOption, type BackgroundSettings, type AccentColor, accentColors } from "@/lib/themes"

interface ThemeDialogProps {
  themes: ThemeOption[]
  currentTheme: string
  currentAccent: string
  pageMode: "light" | "dark"
  onThemeChange: (themeId: string) => void
  onAccentChange: (accentId: string) => void
  onCustomImageUpload: (imageUrl: string, settings?: BackgroundSettings) => void
}

export function ThemeDialog({
  themes,
  currentTheme,
  currentAccent,
  pageMode,
  onThemeChange,
  onAccentChange,
  onCustomImageUpload,
}: ThemeDialogProps) {
  const [selectedTab, setSelectedTab] = useState("themes")
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [selectedAccent, setSelectedAccent] = useState(currentAccent)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState(false)

  const [backgroundSize, setBackgroundSize] = useState<"cover" | "contain" | "auto">("cover")
  const [backgroundPosition, setBackgroundPosition] = useState<BackgroundSettings["position"]>("center")
  const [backgroundRepeat, setBackgroundRepeat] = useState<"no-repeat" | "repeat" | "repeat-x" | "repeat-y">("no-repeat")

  useEffect(() => {
    const savedBackground = localStorage.getItem("thpt-countdown-background")
    const savedSettings = localStorage.getItem("thpt-countdown-background-settings")
    if (savedBackground) setImageUrl(savedBackground)
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setBackgroundSize(settings.size || "cover")
      setBackgroundPosition(settings.position || "center")
      setBackgroundRepeat(settings.repeat || "no-repeat")
    }
  }, [])

  const handleApplyTheme = () => {
    onThemeChange(selectedTheme)
    setImageUrl("")
    setOpen(false)
  }

  const handleApplyAccent = () => {
    onAccentChange(selectedAccent)
    setOpen(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result.toString())
        setIsUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleApplyCustomImage = () => {
    if (imageUrl) {
      const settings: BackgroundSettings = { imageUrl, size: backgroundSize, position: backgroundPosition, repeat: backgroundRepeat }
      localStorage.setItem("thpt-countdown-background-settings", JSON.stringify({ size: backgroundSize, position: backgroundPosition, repeat: backgroundRepeat }))
      onCustomImageUpload(imageUrl, settings)
      setOpen(false)
    }
  }

  const lightThemes = themes.filter(t => t.mode === "light")
  const darkThemes = themes.filter(t => t.mode === "dark")
  const isDark = pageMode === "dark"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", isDark ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-black/5")}
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Tùy chỉnh giao diện</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="themes" value={selectedTab} onValueChange={setSelectedTab} className="mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="themes">Chủ đề</TabsTrigger>
            <TabsTrigger value="accent">Màu nhấn</TabsTrigger>
            <TabsTrigger value="custom">Ảnh nền</TabsTrigger>
          </TabsList>

          {/* --- THEMES TAB --- */}
          <TabsContent value="themes" className="space-y-4 mt-4">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-medium text-muted-foreground">Chủ đề sáng</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {lightThemes.map(theme => (
                  <div
                    key={theme.id}
                    className={cn(
                      "relative rounded-lg overflow-hidden h-16 cursor-pointer transition-all border-2",
                      selectedTheme === theme.id ? "border-primary ring-1 ring-primary/30" : "border-transparent hover:border-muted-foreground/20"
                    )}
                    style={{ background: theme.gradient }}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-slate-700 font-medium text-[11px] text-center px-1 leading-tight">{theme.name}</span>
                    </div>
                    {selectedTheme === theme.id && (
                      <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Moon className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-xs font-medium text-muted-foreground">Chủ đề tối</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {darkThemes.map(theme => (
                  <div
                    key={theme.id}
                    className={cn(
                      "relative rounded-lg overflow-hidden h-16 cursor-pointer transition-all border-2",
                      selectedTheme === theme.id ? "border-primary ring-1 ring-primary/30" : "border-transparent hover:border-muted-foreground/20"
                    )}
                    style={{ background: theme.gradient }}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-medium text-[11px] text-center px-1 leading-tight">{theme.name}</span>
                    </div>
                    {selectedTheme === theme.id && (
                      <div className="absolute top-1 right-1 bg-white rounded-full p-0.5">
                        <Check className="h-3 w-3 text-slate-900" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleApplyTheme} className="w-full">Áp dụng chủ đề</Button>
          </TabsContent>

          {/* --- ACCENT TAB --- */}
          <TabsContent value="accent" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">Chọn màu nhấn cho giao diện</p>
            <div className="grid grid-cols-3 gap-3">
              {accentColors.map((ac: AccentColor) => (
                <div
                  key={ac.id}
                  className={cn(
                    "flex items-center gap-2.5 p-3 rounded-lg cursor-pointer transition-all border-2",
                    selectedAccent === ac.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedAccent(ac.id)}
                >
                  <div className="w-6 h-6 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-background" style={{ backgroundColor: ac.main, "--tw-ring-color": selectedAccent === ac.id ? ac.main : "transparent" } as React.CSSProperties} />
                  <span className="text-sm font-medium">{ac.name}</span>
                </div>
              ))}
            </div>
            <Button onClick={handleApplyAccent} className="w-full">Áp dụng màu nhấn</Button>
          </TabsContent>

          {/* --- CUSTOM IMAGE TAB --- */}
          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Tải ảnh nền lên</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
              </div>

              {imageUrl && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Cài đặt hiển thị</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Kích thước</Label>
                        <Select value={backgroundSize} onValueChange={(v: typeof backgroundSize) => setBackgroundSize(v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cover">Phủ toàn màn hình</SelectItem>
                            <SelectItem value="contain">Vừa khung</SelectItem>
                            <SelectItem value="auto">Kích thước gốc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Lặp lại</Label>
                        <Select value={backgroundRepeat} onValueChange={(v: typeof backgroundRepeat) => setBackgroundRepeat(v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
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
                      <Label>Vị trí</Label>
                      <Select value={backgroundPosition} onValueChange={(v: typeof backgroundPosition) => setBackgroundPosition(v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center">Giữa</SelectItem>
                          <SelectItem value="top">Trên</SelectItem>
                          <SelectItem value="bottom">Dưới</SelectItem>
                          <SelectItem value="left">Trái</SelectItem>
                          <SelectItem value="right">Phải</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Xem trước</Label>
                    <div className="relative rounded-lg overflow-hidden h-32 border" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize, backgroundPosition: backgroundPosition.replace("-", " "), backgroundRepeat }} />
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
