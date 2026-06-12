"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Share2, Heart, Filter, GithubIcon, CheckCircle2, Circle, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeDialog } from "@/components/theme-dialog"
import Link from "next/link"

import { EXAM_YEAR, IS_PREDICT, allExamTypes, examChecklistItems, dailyEncouragements, type ExamType, type ExamSession } from "@/lib/exam-data"
import { motivationalQuotes } from "@/lib/quotes"
import {
  themeOptions, accentColors, DEFAULT_THEME, DEFAULT_ACCENT,
  themeIdMigration, getAccentShades, getThemeById, detectImageBrightness,
  type BackgroundSettings,
} from "@/lib/themes"

export default function THPTCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentExam, setCurrentExam] = useState<ExamSession | null>(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME)
  const [currentAccent, setCurrentAccent] = useState(DEFAULT_ACCENT)
  const [customBackground, setCustomBackground] = useState("")
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    imageUrl: "", size: "cover", position: "center", repeat: "no-repeat",
  })
  const [pageMode, setPageMode] = useState<"light" | "dark">("light")
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [examTypes, setExamTypes] = useState<ExamType[]>(allExamTypes)
  const [tempExamTypes, setTempExamTypes] = useState<ExamType[]>(allExamTypes)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [quoteFading, setQuoteFading] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  // Derive accent shades from current accent + mode
  const accent = getAccentShades(currentAccent, pageMode)
  const accentMain = accentColors.find(a => a.id === currentAccent)?.main || accentColors[0].main

  // Derive page mode from theme
  const updatePageMode = useCallback((themeId: string) => {
    const theme = getThemeById(themeId)
    setPageMode(theme.mode)
    setTheme(theme.mode === "dark" ? "dark" : "light")
  }, [setTheme])

  // Get the next upcoming exam
  const getNextExam = useCallback(() => {
    const now = new Date().getTime()
    const allSessions: ExamSession[] = []
    examTypes.forEach(examType => {
      if (examType.enabled) {
        examType.sessions.forEach(session => {
          if (session.enabled) allSessions.push(session)
        })
      }
    })
    allSessions.sort((a, b) => {
      const aTime = a.datetime instanceof Date ? a.datetime.getTime() : new Date(a.datetime).getTime()
      const bTime = b.datetime instanceof Date ? b.datetime.getTime() : new Date(b.datetime).getTime()
      return aTime - bTime
    })
    for (const exam of allSessions) {
      const examTime = exam.datetime instanceof Date ? exam.datetime.getTime() : new Date(exam.datetime).getTime()
      if (examTime > now) return exam
    }
    return null
  }, [examTypes])

  // Exam type toggles
  const toggleExamType = (examTypeId: string) => {
    setTempExamTypes(prev => prev.map(et =>
      et.id === examTypeId ? { ...et, enabled: !et.enabled } : et
    ))
  }

  const toggleExamSession = (examTypeId: string, sessionId: string) => {
    setTempExamTypes(prev => prev.map(et => {
      if (et.id === examTypeId) {
        return { ...et, sessions: et.sessions.map(s => s.id === sessionId ? { ...s, enabled: !s.enabled } : s) }
      }
      return et
    }))
  }

  const saveExamTypes = () => {
    setExamTypes(tempExamTypes)
    localStorage.setItem("exam-types-enabled", JSON.stringify(tempExamTypes))
    setIsFilterModalOpen(false)
  }

  const openFilterModal = () => {
    setTempExamTypes(examTypes)
    setIsFilterModalOpen(true)
  }

  // Checklist toggle
  const toggleChecklistItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] }
    setCheckedItems(updated)
    localStorage.setItem("thpt-exam-checklist", JSON.stringify(updated))
  }

  // Progress calculation
  const getProgress = () => {
    // School year starts Sep 5, exam is Jun 11
    const schoolStart = new Date(`${EXAM_YEAR - 1}-09-05T00:00:00`)
    const examDay = new Date(`${EXAM_YEAR}-06-11T07:30:00`)
    const now = new Date()
    const totalDuration = examDay.getTime() - schoolStart.getTime()
    const elapsed = now.getTime() - schoolStart.getTime()
    const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    return Math.round(pct * 10) / 10
  }

  // Daily encouragement (deterministic by date)
  const getDailyEncouragement = () => {
    const now = new Date()
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    return dailyEncouragements[dayOfYear % dailyEncouragements.length]
  }

  // Initialize
  useEffect(() => {
    setMounted(true)

    const savedTheme = localStorage.getItem("thpt-countdown-theme")
    const savedAccent = localStorage.getItem("thpt-countdown-accent")
    const savedBackground = localStorage.getItem("thpt-countdown-background")
    const savedSettings = localStorage.getItem("thpt-countdown-background-settings")
    const savedExamTypes = localStorage.getItem("exam-types-enabled")
    const savedChecklist = localStorage.getItem("thpt-exam-checklist")

    // Theme
    if (savedTheme) {
      const mappedTheme = themeIdMigration[savedTheme] || savedTheme
      setCurrentTheme(mappedTheme)
      updatePageMode(mappedTheme)
    } else {
      updatePageMode(DEFAULT_THEME)
    }

    // Accent
    if (savedAccent && accentColors.some(a => a.id === savedAccent)) {
      setCurrentAccent(savedAccent)
    }

    // Custom background
    if (savedBackground) {
      setCustomBackground(savedBackground)
      // Detect brightness for custom bg
      detectImageBrightness(savedBackground).then(mode => setPageMode(mode))
    }

    if (savedSettings) {
      const s = JSON.parse(savedSettings)
      setBackgroundSettings({ imageUrl: savedBackground || "", size: s.size || "cover", position: s.position || "center", repeat: s.repeat || "no-repeat" })
    }

    // Exam types
    if (savedExamTypes) {
      try {
        const parsed = JSON.parse(savedExamTypes)
        const reconstructed = parsed.map((et: ExamType) => ({
          ...et,
          sessions: et.sessions.map(s => ({ ...s, datetime: new Date(s.datetime) })),
        }))
        setExamTypes(reconstructed)
        setTempExamTypes(reconstructed)
      } catch (e) {
        console.error("Failed to parse saved exam types:", e)
      }
    } else {
      const defaults = allExamTypes.map(et => ({
        ...et,
        enabled: et.id === "thptqg",
        sessions: et.sessions.map(s => ({ ...s, enabled: et.id === "thptqg" })),
      }))
      setExamTypes(defaults)
      setTempExamTypes(defaults)
    }

    // Checklist
    if (savedChecklist) {
      try { setCheckedItems(JSON.parse(savedChecklist)) } catch { }
    }
  }, [updatePageMode])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const nextExam = getNextExam()
      if (nextExam) {
        setCurrentExam(nextExam)
        const examTime = nextExam.datetime instanceof Date ? nextExam.datetime.getTime() : new Date(nextExam.datetime).getTime()
        const distance = examTime - now
        if (distance > 0) {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          })
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      } else {
        setCurrentExam(null)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [examTypes, getNextExam])

  // Quote rotation
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteFading(true)
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length)
        setQuoteFading(false)
      }, 400)
    }, 8000)
    return () => clearInterval(quoteTimer)
  }, [])

  // Handlers
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    setCustomBackground("")
    setBackgroundSettings({ imageUrl: "", size: "cover", position: "center", repeat: "no-repeat" })
    localStorage.setItem("thpt-countdown-theme", themeId)
    localStorage.removeItem("thpt-countdown-background")
    localStorage.removeItem("thpt-countdown-background-settings")
    updatePageMode(themeId)
  }

  const handleAccentChange = (accentId: string) => {
    setCurrentAccent(accentId)
    localStorage.setItem("thpt-countdown-accent", accentId)
  }

  const handleCustomImageUpload = async (imageUrl: string, settings?: BackgroundSettings) => {
    setCustomBackground(imageUrl)
    if (settings) setBackgroundSettings(settings)
    localStorage.setItem("thpt-countdown-background", imageUrl)
    localStorage.removeItem("thpt-countdown-theme")
    const detectedMode = await detectImageBrightness(imageUrl)
    setPageMode(detectedMode)
    setTheme(detectedMode === "dark" ? "dark" : "light")
  }

  const shareCountdown = () => {
    if (navigator.share) {
      const year = currentExam
        ? (currentExam.datetime instanceof Date ? currentExam.datetime : new Date(currentExam.datetime)).getFullYear()
        : EXAM_YEAR
      const subject = currentExam ? currentExam.subject : "cac mon thi"
      navigator.share({
        title: `Dem nguoc thi THPT ${year}`,
        text: `Con ${timeLeft.days} ngay nua la den ky thi ${subject}! Cung nhau co gang nhe! 💪`,
        url: window.location.href,
      })
    }
  }

  const getBackgroundStyles = () => {
    if (customBackground) {
      return {
        backgroundImage: `url(${customBackground})`,
        backgroundSize: backgroundSettings.size,
        backgroundPosition: backgroundSettings.position.replace("-", " "),
        backgroundRepeat: backgroundSettings.repeat,
      }
    }
    const selectedTheme = themeOptions.find(t => t.id === currentTheme)
    return {
      backgroundImage: selectedTheme?.gradient || themeOptions[0].gradient,
      backgroundSize: "auto" as const,
      backgroundPosition: "initial",
      backgroundRepeat: "no-repeat",
    }
  }

  if (!mounted) return null

  const isDark = pageMode === "dark"
  const progress = getProgress()
  const dailyMsg = getDailyEncouragement()
  const checkedCount = examChecklistItems.filter(item => checkedItems[item.id]).length

  // CSS vars for accent
  const accentVars = {
    "--ac-text": accent.text,
    "--ac-bg": accent.bg,
    "--ac-border": accent.border,
    "--ac-solid": accent.solid,
    "--ac-solid-hover": accent.solidHover,
  } as React.CSSProperties

  return (
    <div
      className="min-h-[100dvh] relative overflow-hidden transition-all duration-700"
      data-page-mode={pageMode}
      style={{ ...getBackgroundStyles(), ...accentVars }}
    >
      {/* Subtle ambient glow */}
      {!customBackground && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: `var(--pg-glow-1)` }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: `var(--pg-glow-2)` }} />
        </div>
      )}

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md border-b" style={{ background: `var(--pg-header)`, borderColor: `var(--pg-border)` }}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center border" style={{ background: accent.bg, borderColor: accent.border }}>
              <Calendar className="h-4 w-4" style={{ color: accent.text }} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: `var(--pg-text)` }}>
                Đếm Ngược Ngày Thi THPT Quốc Gia {EXAM_YEAR}
              </h1>
              <p className="text-xs" style={{ color: `var(--pg-text-secondary)` }}>
                Trang web đếm ngược ngày thi THPT {EXAM_YEAR}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={openFilterModal}
              className="h-8 w-8"
              style={{ color: `var(--pg-text-secondary)` }}
              title="Lọc kỳ thi"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={shareCountdown}
              className="h-8 w-8"
              style={{ color: `var(--pg-text-secondary)` }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <ThemeDialog
              themes={themeOptions}
              currentTheme={currentTheme}
              currentAccent={currentAccent}
              pageMode={pageMode}
              onThemeChange={handleThemeChange}
              onAccentChange={handleAccentChange}
              onCustomImageUpload={handleCustomImageUpload}
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero: Next Exam + Countdown */}
            <div className="space-y-5 section-enter">
              {/* Next exam header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ background: accent.bg, borderColor: accent.border }}>
                  <Clock className="h-4 w-4" style={{ color: accent.text }} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: `var(--pg-text-secondary)` }}>
                    {currentExam ? "Môn thi tiếp theo" : "Ngày thi chính thức"}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-lg font-bold" style={{ color: `var(--pg-text)` }}>
                      {currentExam ? currentExam.subject : `Kỳ thi THPT Quốc Gia ${EXAM_YEAR}`}
                    </p>
                    <Badge className="text-xs px-2 py-0.5" style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}>
                      {currentExam ? `${currentExam.date} - ${currentExam.time}` : `11/6/${EXAM_YEAR} - 07:30`}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Countdown subheading */}
              <p className="text-sm" style={{ color: `var(--pg-text-secondary)` }}>
                {currentExam ? `Thời gian còn lại đến môn thi ${currentExam.subject}` : "Thời gian còn lại đến kỳ thi"}
              </p>

              {/* Countdown Tiles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: timeLeft.days, label: "Ngày" },
                  { value: timeLeft.hours, label: "Giờ" },
                  { value: timeLeft.minutes, label: "Phút" },
                  { value: timeLeft.seconds, label: "Giây" },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className="countdown-tile backdrop-blur-sm rounded-xl p-5 border transition-colors duration-300"
                    style={{
                      background: `var(--pg-surface)`,
                      borderColor: `var(--pg-border)`,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accent.border }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `var(--pg-border)` }}
                  >
                    <div className="countdown-number text-4xl md:text-5xl font-bold mb-1 tabular-nums" style={{ color: `var(--pg-text)` }}>
                      {tile.value}
                    </div>
                    <div className="uppercase tracking-wider text-xs font-semibold" style={{ color: accent.text, opacity: 0.8 }}>
                      {tile.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivational Quote */}
              <div className="border-l-2 pl-4 py-1" style={{ borderColor: `${accent.text}40` }}>
                <div className={`quote-fade ${quoteFading ? "opacity-0" : "opacity-100"}`}>
                  <p className="text-sm italic leading-relaxed" style={{ color: isDark ? "#cbd5e1" : "#475569" }}>
                    &ldquo;{motivationalQuotes[currentQuote].quote}&rdquo;
                  </p>
                  <p className="text-xs mt-1" style={{ color: `var(--pg-text-muted)` }}>
                    {motivationalQuotes[currentQuote].author}
                    <span className="ml-2" style={{ color: `var(--pg-text-muted)`, opacity: 0.7 }}>
                      {motivationalQuotes[currentQuote].translation}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar Section */}
            <div className="section-enter backdrop-blur-sm rounded-xl border p-5" style={{ background: `var(--pg-surface)`, borderColor: `var(--pg-border)` }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold" style={{ color: `var(--pg-text)` }}>Tiến trình</h2>
                <span className="text-sm font-bold" style={{ color: accent.text }}>{progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
                <div
                  className="h-full rounded-full progress-bar-fill"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accent.solid}, ${accent.text})` }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: `var(--pg-text-muted)` }}>
                {progress}% thời gian đã qua từ đầu năm học (05/09/{EXAM_YEAR - 1}) đến kỳ thi THPT {EXAM_YEAR}
              </p>
            </div>

            {/* Daily Encouragement */}
            <div className="section-enter backdrop-blur-sm rounded-xl border p-5" style={{ background: `var(--pg-surface)`, borderColor: `var(--pg-border)` }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0" style={{ background: accent.bg, borderColor: accent.border }}>
                  <Sparkles className="h-4 w-4" style={{ color: accent.text }} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold mb-1" style={{ color: `var(--pg-text)` }}>Đôi lời nhắn nhủ đến bạn</h2>
                  <p className="text-sm leading-relaxed" style={{ color: `var(--pg-text-secondary)` }}>{dailyMsg}</p>
                </div>
              </div>
            </div>

            {/* Exam Day Checklist */}
            {currentExam && timeLeft.days <= 7 && (
              <div className="section-enter backdrop-blur-sm rounded-xl border p-5" style={{ background: `var(--pg-surface)`, borderColor: `var(--pg-border)` }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold" style={{ color: `var(--pg-text)` }}>Chuẩn bị ngày thi</h2>
                  <Badge className="text-xs" style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}>
                    {checkedCount}/{examChecklistItems.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {examChecklistItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-colors"
                      style={{ background: checkedItems[item.id] ? accent.bg : "transparent" }}
                    >
                      {checkedItems[item.id] ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: accent.text }} />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0" style={{ color: `var(--pg-text-muted)` }} />
                      )}
                      <span
                        className="text-sm"
                        style={{
                          color: checkedItems[item.id] ? accent.text : `var(--pg-text-secondary)`,
                          textDecoration: checkedItems[item.id] ? "line-through" : "none",
                          opacity: checkedItems[item.id] ? 0.7 : 1,
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
                {checkedCount === examChecklistItems.length && (
                  <p className="text-xs mt-3 font-medium" style={{ color: accent.text }}>
                    Bạn đã chuẩn bị đầy đủ! Chúc bạn thi tốt! 🎉
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Exam Schedule */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-sm rounded-xl border h-fit sticky top-4" style={{ background: `var(--pg-surface)`, borderColor: `var(--pg-border)` }}>
              <div className="p-4 border-b" style={{ borderColor: `var(--pg-border)` }}>
                <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: `var(--pg-text)` }}>
                  <Calendar className="h-4 w-4" style={{ color: accent.text }} />
                  Lịch thi tổng quan {EXAM_YEAR} {IS_PREDICT && "(Dự kiến)"}
                </h2>
              </div>
              <div className="p-3">
                <div className="grid gap-2">
                  {examTypes
                    .flatMap(et => (et.enabled ? et.sessions.filter(s => s.enabled) : []))
                    .sort((a, b) => {
                      const aT = a.datetime instanceof Date ? a.datetime.getTime() : new Date(a.datetime).getTime()
                      const bT = b.datetime instanceof Date ? b.datetime.getTime() : new Date(b.datetime).getTime()
                      return aT - bT
                    })
                    .map(session => (
                      <div
                        key={session.id}
                        className="exam-item p-3 rounded-lg border transition-colors duration-200"
                        style={{
                          background: currentExam?.id === session.id ? accent.bg : `var(--pg-surface-hover)`,
                          borderColor: currentExam?.id === session.id ? accent.border : `var(--pg-border)`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="text-base shrink-0">{session.icon}</div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-medium truncate" style={{ color: `var(--pg-text)` }}>{session.subject}</h3>
                              <div className="flex flex-wrap gap-1.5 text-xs mt-0.5" style={{ color: `var(--pg-text-secondary)` }}>
                                <span>{session.date}</span>
                                <span style={{ color: `var(--pg-text-muted)` }}>|</span>
                                <span>{session.time}</span>
                                {session.duration && (
                                  <>
                                    <span style={{ color: `var(--pg-text-muted)` }}>|</span>
                                    <span>{session.duration}</span>
                                  </>
                                )}
                              </div>
                              {session.description && (
                                <p className="text-xs mt-1 truncate" style={{ color: `var(--pg-text-muted)` }}>{session.description}</p>
                              )}
                              {session.locations && (
                                <p className="text-xs mt-0.5 truncate" style={{ color: `var(--pg-text-muted)` }}>{session.locations}</p>
                              )}
                            </div>
                          </div>
                          {currentExam?.id === session.id && (
                            <Badge className="text-[10px] px-1.5 py-0.5 shrink-0 ml-2" style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}>
                              Đang đếm ngược
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: `var(--pg-overlay)` }}>
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto" style={{ background: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)", color: `var(--pg-text)`, borderColor: `var(--pg-border)` }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Lọc kỳ thi</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterModalOpen(false)} className="h-8 w-8" style={{ color: `var(--pg-text-secondary)` }}>
                ✕
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tempExamTypes.map(examType => (
                  <div key={examType.id} className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg border" style={{ background: `var(--pg-surface)`, borderColor: `var(--pg-border)` }}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={examType.enabled}
                          onChange={() => toggleExamType(examType.id)}
                          className="w-5 h-5 rounded"
                          style={{ accentColor: accentMain }}
                        />
                        <div>
                          <span className="font-semibold text-sm">{examType.shortName}</span>
                          <p className="text-xs" style={{ color: `var(--pg-text-secondary)` }}>{examType.name}</p>
                        </div>
                      </div>
                      <Badge className="text-xs" style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}>
                        {examType.sessions.filter(s => s.enabled).length}/{examType.sessions.length}
                      </Badge>
                    </div>
                    {examType.enabled && (
                      <div className="space-y-1 ml-6">
                        {examType.sessions.map(session => (
                          <div key={session.id} className="flex items-start gap-3 p-2 rounded-lg transition-colors" style={{ background: "transparent" }}>
                            <input
                              type="checkbox"
                              checked={session.enabled}
                              onChange={() => toggleExamSession(examType.id, session.id)}
                              className="w-4 h-4 rounded mt-1 shrink-0"
                              style={{ accentColor: accentMain }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <span className="text-base shrink-0">{session.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-sm">{session.subject}</h3>
                                  <div className="flex flex-wrap gap-1.5 text-xs mt-0.5" style={{ color: `var(--pg-text-secondary)` }}>
                                    <span>{session.date}</span>
                                    <span style={{ color: `var(--pg-text-muted)` }}>|</span>
                                    <span>{session.time}</span>
                                    {session.duration && (
                                      <>
                                        <span style={{ color: `var(--pg-text-muted)` }}>|</span>
                                        <span>{session.duration}</span>
                                      </>
                                    )}
                                  </div>
                                  {session.description && <p className="text-xs mt-1" style={{ color: `var(--pg-text-muted)` }}>{session.description}</p>}
                                  {session.locations && <p className="text-xs mt-0.5" style={{ color: `var(--pg-text-muted)` }}>{session.locations}</p>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const reset = allExamTypes.map(et => ({
                      ...et,
                      enabled: et.id === "thptqg",
                      sessions: et.sessions.map(s => ({ ...s, enabled: et.id === "thptqg" })),
                    }))
                    setTempExamTypes(reset)
                  }}
                  style={{ borderColor: `var(--pg-border)`, color: `var(--pg-text-secondary)` }}
                >
                  Đặt lại mặc đỉnh
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsFilterModalOpen(false)} style={{ borderColor: `var(--pg-border)`, color: `var(--pg-text-secondary)` }}>
                    Huỷ
                  </Button>
                  <Button onClick={saveExamTypes} style={{ background: accent.solid, color: `var(--pg-text-inverse)` }}>
                    Lưu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md border-t mt-8" style={{ background: `var(--pg-header)`, borderColor: `var(--pg-border)` }}>
        <div className="container mx-auto px-4 py-5 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-center md:text-left" style={{ color: `var(--pg-text-muted)` }}>
              @{EXAM_YEAR} - @anhkhoatqt11
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs" style={{ color: `var(--pg-text-secondary)` }}>
                <Heart className="h-3 w-3 mr-1.5" />
                Ủng hộ
              </Button>
              <Link
                href="https://github.com/anhkhoatqt11/demnguockithi/tree/master"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
              >
                <GithubIcon className="h-3.5 w-3.5" style={{ color: `var(--pg-text-muted)` }} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}