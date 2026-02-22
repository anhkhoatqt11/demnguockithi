"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Calendar, Clock, Users, Quote, Share2, Heart, Star, Target, Zap, GithubIcon, BookOpen, Filter } from "lucide-react"
import { useTheme } from "next-themes"
import { NewsSection, type NewsArticle } from "@/components/new-section"
import { ThemeDialog, type ThemeOption, type BackgroundSettings } from "@/components/theme-dialog"
import Link from "next/link"

const motivationalQuotes = [
  {
    quote: "Trí thức là sức mạnh",
    author: "F.Bacon",
    translation: "Knowledge is power",
  },
  {
    quote: "Học, học nữa, học mãi",
    author: "Hồ Chí Minh",
    translation: "Study, study more, study forever",
  },
  {
    quote: "Thành công là kết quả của sự chuẩn bị, làm việc chăm chỉ và học hỏi từ thất bại",
    author: "Colin Powell",
    translation: "Success is the result of preparation, hard work, and learning from failure",
  },
  {
    quote: "Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới",
    author: "Nelson Mandela",
    translation: "Education is the most powerful weapon you can use to change the world",
  },
  {
    quote: "Đầu tư vào tri thức luôn mang lại lợi nhuận tốt nhất",
    author: "Benjamin Franklin",
    translation: "An investment in knowledge pays the best interest",
  },
]

// Exam types and their schedules
type ExamType = {
  id: string
  name: string
  shortName: string
  enabled: boolean
  sessions: ExamSession[]
}

type ExamSession = {
  id: string
  date: string
  subject: string
  time: string
  duration?: string
  datetime: Date
  icon: string
  description?: string
  locations?: string
  enabled: boolean
}

const allExamTypes: ExamType[] = [
  {
    id: "vact",
    name: "Kỳ thi Đánh giá năng lực - ĐHQG TP.HCM",
    shortName: "V-ACT",
    enabled: true,
    sessions: [
      {
        id: "vact-1",
        date: "05/04/2026",
        subject: "V-ACT Đợt 1",
        time: "08:00",
        duration: "150 phút",
        datetime: new Date("2026-04-05T08:00:00"),
        icon: "🎯",
        description: "Đợt 1 - Đăng ký: 24/01/2026 – 23/02/2026",
        enabled: true,
      },
      {
        id: "vact-2",
        date: "24/05/2026",
        subject: "V-ACT Đợt 2",
        time: "08:00",
        duration: "150 phút",
        datetime: new Date("2026-05-24T08:00:00"),
        icon: "🎯",
        description: "Đợt 2 - Đăng ký: 18/04/2026 – 25/04/2026",
        enabled: true,
      },
    ],
  },
  {
    id: "tsa",
    name: "Kỳ thi Đánh giá tư duy - ĐH Bách khoa Hà Nội",
    shortName: "TSA",
    enabled: true,
    sessions: [
      {
        id: "tsa-1",
        date: "14/03/2026",
        subject: "TSA 2026 - Đợt 2 - Ngày 1",
        time: "08:00",
        duration: "150 phút",
        datetime: new Date("2026-03-14T08:00:00"),
        icon: "🧠",
        enabled: true,
      },
      {
        id: "tsa-2",
        date: "15/03/2026",
        subject: "TSA 2026 - Đợt 2 - Ngày 2",
        time: "08:00",
        duration: "150 phút",
        datetime: new Date("2026-03-15T08:00:00"),
        icon: "🧠",
        enabled: true,
      },
    ],
  },
  {
    id: "hsa",
    name: "Kỳ thi Đánh giá năng lực - ĐHQG Hà Nội",
    shortName: "HSA",
    enabled: true,
    sessions: [
      {
        id: "hsa-601-1",
        date: "07/03/2026",
        subject: "HSA 601 - Ngày 1",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-03-07T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên,...",
        enabled: true,
      },
      {
        id: "hsa-601-2",
        date: "08/03/2026",
        subject: "HSA 601 - Ngày 2",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-03-08T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên,...",
        enabled: true,
      },
      {
        id: "hsa-602-1",
        date: "21/03/2026",
        subject: "HSA 602 - Ngày 1",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-03-21T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Hải Phòng, Thanh Hóa, Hà Tĩnh,...",
        enabled: true,
      },
      {
        id: "hsa-602-2",
        date: "22/03/2026",
        subject: "HSA 602 - Ngày 2",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-03-22T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Hải Phòng, Thanh Hóa, Hà Tĩnh,...",
        enabled: true,
      },
      {
        id: "hsa-603-1",
        date: "04/04/2026",
        subject: "HSA 603 - Ngày 1",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-04-04T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Hải Phòng, Hà Tĩnh,...",
        enabled: true,
      },
      {
        id: "hsa-603-2",
        date: "05/04/2026",
        subject: "HSA 603 - Ngày 2",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-04-05T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Hải Phòng, Hà Tĩnh,...",
        enabled: true,
      },
      {
        id: "hsa-604-1",
        date: "18/04/2026",
        subject: "HSA 604 - Ngày 1",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-04-18T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Thanh Hóa,...",
        enabled: true,
      },
      {
        id: "hsa-604-2",
        date: "19/04/2026",
        subject: "HSA 604 - Ngày 2",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-04-19T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Thanh Hóa,...",
        enabled: true,
      },
      {
        id: "hsa-605-1",
        date: "09/05/2026",
        subject: "HSA 605 - Ngày 1",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-05-09T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Hải Phòng,...",
        enabled: true,
      },
      {
        id: "hsa-605-2",
        date: "10/05/2026",
        subject: "HSA 605 - Ngày 2",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-05-10T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Hải Phòng,...",
        enabled: true,
      },
      {
        id: "hsa-606-1",
        date: "23/05/2026",
        subject: "HSA 606 - Ngày 1",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-05-23T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Hải Phòng,...",
        enabled: true,
      },
      {
        id: "hsa-606-2",
        date: "24/05/2026",
        subject: "HSA 606 - Ngày 2",
        time: "08:00",
        duration: "180 phút",
        datetime: new Date("2026-05-24T08:00:00"),
        icon: "📊",
        locations: "Hà Nội, Hưng Yên, Ninh Bình, Thái Nguyên, Hải Phòng,...",
        enabled: true,
      },
    ],
  },
  {
    id: "thptqg",
    name: "Kỳ thi tốt nghiệp THPT Quốc gia",
    shortName: "THPTQG",
    enabled: true,
    sessions: [
      {
        id: "thptqg-1",
        date: "11/6/2026",
        subject: "Ngữ văn",
        time: "07:30",
        duration: "120 phút",
        datetime: new Date("2026-06-11T07:30:00"),
        icon: "📝",
        enabled: true,
      },
      {
        id: "thptqg-2",
        date: "11/6/2026",
        subject: "Toán",
        time: "14:20",
        duration: "90 phút",
        datetime: new Date("2026-06-11T14:20:00"),
        icon: "🔢",
        enabled: true,
      },
      {
        id: "thptqg-3",
        date: "12/6/2026",
        subject: "Bài thi Tự chọn môn thứ nhất",
        time: "07:30",
        duration: "50 phút",
        datetime: new Date("2026-06-12T07:30:00"),
        icon: "1️⃣",
        enabled: true,
      },
      {
        id: "thptqg-4",
        date: "12/6/2026",
        subject: "Bài thi Tự chọn môn thứ hai",
        time: "08:35",
        duration: "50 phút",
        datetime: new Date("2026-06-12T08:35:00"),
        icon: "2️⃣",
        enabled: true,
      },
    ],
  },
]

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Đại học Bách khoa Hà Nội công bố lịch thi đánh giá tư duy năm 2026",
    excerpt: "Kỳ thi đánh giá tư duy của Đại học Bách khoa Hà Nội (TSA) năm 2026 dự kiến có ba đợt, sớm nhất vào cuối tháng 1.",
    category: "Thông tin kỳ thi",
    date: "2025-09-15",
    readTime: "5 phút đọc",
    priority: "low",
    articleUrl: "https://vnexpress.net/lich-thi-danh-gia-tu-duy-dai-hoc-bach-khoa-ha-noi-tsa-nam-2026-chinh-xac-nhat-4939053.html"
  },
  {
    id: 2,
    title: "Lịch thi THPT quốc gia 2026: diễn ra vào ngày 11/6-12/6/2026 (dự kiến)",
    excerpt: "Lịch thi tốt nghiệp THPT năm 2026 đã được Bộ Giáo dục và Đào tạo công bố. Theo quy định của Bộ GDĐT, Kỳ thi tốt nghiệp THPT năm 2026 được tổ chức vào các ngày 11, 12/6/2026, với nhiều điểm mới và thay đổi quan trọng trong cấu trúc đề thi.",
    category: "Thông tin kỳ thi",
    date: "2026-02-22",
    readTime: "8 phút đọc",
    priority: "high",
    articleUrl: "https://thuvienphapluat.vn/hoi-dap-phap-luat/lich-thi-thpt-quoc-gia-2026-dien-ra-vao-ngay-1161262026-du-kien-dung-khong-138059892.html#:~:text=Nh%C6%B0%20v%E1%BA%ADy%2C%20l%E1%BB%8Bch%20thi%20THPT,ki%E1%BA%BFn)%20%C4%91%C3%BAng%20kh%C3%B4ng?%22."
  },
]

const themeOptions: ThemeOption[] = [
  {
    id: "elegant-green",
    name: "Xanh Lá Thanh Lịch",
    gradient: "linear-gradient(135deg, #1a5276 0%, #117864 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Elegant+Green",
  },
  {
    id: "ocean-blue",
    name: "Xanh Đại Dương",
    gradient: "linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Ocean+Blue",
  },
  {
    id: "sunset-orange",
    name: "Cam Hoàng Hôn",
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Sunset+Orange",
  },
  {
    id: "purple-dream",
    name: "Tím Mộng Mơ",
    gradient: "linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Purple+Dream",
  },
  {
    id: "forest-green",
    name: "Xanh Rừng",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Forest+Green",
  },
  {
    id: "night-sky",
    name: "Bầu Trời Đêm",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Night+Sky",
  },
]

export default function THPT2025Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [currentExam, setCurrentExam] = useState<ExamSession | null>(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [currentTheme, setCurrentTheme] = useState("elegant-green")
  const [customBackground, setCustomBackground] = useState("")
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    imageUrl: "",
    size: "cover",
    position: "center",
    repeat: "no-repeat"
  })
  const [studyStreak, setStudyStreak] = useState(12)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [examTypes, setExamTypes] = useState<ExamType[]>(allExamTypes)
  const [tempExamTypes, setTempExamTypes] = useState<ExamType[]>(allExamTypes)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // Function to get the next upcoming exam from enabled sessions
  const getNextExam = useCallback(() => {
    const now = new Date().getTime()
    const allSessions: ExamSession[] = []

    // Collect all enabled sessions from enabled exam types
    examTypes.forEach(examType => {
      if (examType.enabled) {
        examType.sessions.forEach(session => {
          if (session.enabled) {
            allSessions.push(session)
          }
        })
      }
    })

    // Sort by datetime
    allSessions.sort((a, b) => {
      const aTime = a.datetime instanceof Date ? a.datetime.getTime() : new Date(a.datetime).getTime()
      const bTime = b.datetime instanceof Date ? b.datetime.getTime() : new Date(b.datetime).getTime()
      return aTime - bTime
    })

    // Find the next exam
    for (const exam of allSessions) {
      const examTime = exam.datetime instanceof Date ? exam.datetime.getTime() : new Date(exam.datetime).getTime()
      if (examTime > now) {
        return exam
      }
    }
    return null // All exams have passed
  }, [examTypes])

  // Toggle exam type in modal (temporary state)
  const toggleExamType = (examTypeId: string) => {
    const updatedExamTypes = tempExamTypes.map(et =>
      et.id === examTypeId ? { ...et, enabled: !et.enabled } : et
    )
    setTempExamTypes(updatedExamTypes)
  }

  // Toggle individual exam session in modal (temporary state)
  const toggleExamSession = (examTypeId: string, sessionId: string) => {
    const updatedExamTypes = tempExamTypes.map(et => {
      if (et.id === examTypeId) {
        return {
          ...et,
          sessions: et.sessions.map(s =>
            s.id === sessionId ? { ...s, enabled: !s.enabled } : s
          )
        }
      }
      return et
    })
    setTempExamTypes(updatedExamTypes)
  }

  // Save exam type preferences
  const saveExamTypes = () => {
    setExamTypes(tempExamTypes)
    localStorage.setItem('exam-types-enabled', JSON.stringify(tempExamTypes))
    setIsFilterModalOpen(false)
  }

  // Open modal and sync temp state
  const openFilterModal = () => {
    setTempExamTypes(examTypes)
    setIsFilterModalOpen(true)
  }

  useEffect(() => {
    setMounted(true)

    // Load saved theme and background from localStorage
    const savedTheme = localStorage.getItem('thpt-countdown-theme')
    const savedBackground = localStorage.getItem('thpt-countdown-background')
    const savedSettings = localStorage.getItem('thpt-countdown-background-settings')
    const savedExamTypes = localStorage.getItem('exam-types-enabled')

    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }

    if (savedBackground) {
      setCustomBackground(savedBackground)
    }

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setBackgroundSettings({
        imageUrl: savedBackground || "",
        size: settings.size || "cover",
        position: settings.position || "center",
        repeat: settings.repeat || "no-repeat"
      })
    }

    if (savedExamTypes) {
      try {
        const parsed = JSON.parse(savedExamTypes)
        // Reconstruct Date objects from stored strings
        const reconstructed = parsed.map((examType: ExamType) => ({
          ...examType,
          sessions: examType.sessions.map(session => ({
            ...session,
            datetime: new Date(session.datetime)
          }))
        }))
        setExamTypes(reconstructed)
        setTempExamTypes(reconstructed)
      } catch (e) {
        console.error('Failed to parse saved exam types:', e)
      }
    } else {
      // Default: Only enable THPTQG
      const defaultExamTypes = allExamTypes.map(et => ({
        ...et,
        enabled: et.id === 'thptqg',
        sessions: et.sessions.map(s => ({ ...s, enabled: et.id === 'thptqg' }))
      }))
      setExamTypes(defaultExamTypes)
      setTempExamTypes(defaultExamTypes)
    }
  }, [])

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
        // All exams have passed
        setCurrentExam(null)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [examTypes, getNextExam])

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 8000)

    return () => clearInterval(quoteTimer)
  }, [])

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    setCustomBackground("")
    setBackgroundSettings({
      imageUrl: "",
      size: "cover",
      position: "center",
      repeat: "no-repeat"
    })
    localStorage.setItem('thpt-countdown-theme', themeId)
    localStorage.removeItem('thpt-countdown-background')
    localStorage.removeItem('thpt-countdown-background-settings')
  }

  const handleCustomImageUpload = (imageUrl: string, settings?: BackgroundSettings) => {
    setCustomBackground(imageUrl)
    if (settings) {
      setBackgroundSettings(settings)
    }
    localStorage.setItem('thpt-countdown-background', imageUrl)
    localStorage.removeItem('thpt-countdown-theme')
  }

  const clearStoredPreferences = () => {
    localStorage.removeItem('thpt-countdown-theme')
    localStorage.removeItem('thpt-countdown-background')
    localStorage.removeItem('thpt-countdown-background-settings')
    setCurrentTheme("elegant-green")
    setCustomBackground("")
    setBackgroundSettings({
      imageUrl: "",
      size: "cover",
      position: "center",
      repeat: "no-repeat"
    })
  }

  const shareCountdown = () => {
    if (navigator.share) {
      const year = currentExam
        ? (currentExam.datetime instanceof Date ? currentExam.datetime : new Date(currentExam.datetime)).getFullYear()
        : 2026
      const subject = currentExam ? currentExam.subject : "các môn thi"
      navigator.share({
        title: `Đếm ngược thi THPT ${year}`,
        text: `Còn ${timeLeft.days} ngày nữa là đến kỳ thi ${subject}! Cùng nhau cố gắng nhé! 💪`,
        url: window.location.href,
      })
    }
  }

  const getBackgroundStyles = () => {
    if (customBackground) {
      return {
        backgroundImage: `url(${customBackground})`,
        backgroundSize: backgroundSettings.size,
        backgroundPosition: backgroundSettings.position.replace('-', ' '),
        backgroundRepeat: backgroundSettings.repeat,
      }
    } else {
      const selectedTheme = themeOptions.find((t) => t.id === currentTheme)
      const gradient = selectedTheme?.gradient || themeOptions[0].gradient
      return {
        backgroundImage: gradient,
        backgroundSize: "auto",
        backgroundPosition: "initial",
        backgroundRepeat: "no-repeat",
      }
    }
  }

  const formatCountdown = (countdown: { days: number, hours: number, minutes: number, seconds: number }) => {
    if (countdown.days > 0) {
      return `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`
    } else if (countdown.hours > 0) {
      return `${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`
    } else {
      return `${countdown.minutes}m ${countdown.seconds}s`
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-all duration-1000"
      style={getBackgroundStyles()}
    >
      {/* Animated Background Shapes */}
      {!customBackground && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl animate-bounce delay-500"></div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <circle cx="100" cy="500" r="150" fill="rgba(255,255,255,0.05)" />
            <circle cx="1100" cy="200" r="80" fill="rgba(255,255,255,0.08)" />
            <path
              d="M0,600 Q300,400 600,500 T1200,400"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      )}

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Đếm Ngược Ngày Thi Tốt Nghiệp THPT 2026</h1>
              <p className="text-white/70 text-sm">Trang web đếm ngược ngày thi tốt nghiệp THPT 2026</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={openFilterModal}
              className="text-white hover:bg-white/20"
              title="Lọc kỳ thi"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={shareCountdown} className="text-white hover:bg-white/20">
              <Share2 className="h-4 w-4" />
            </Button>
            <ThemeDialog
              themes={themeOptions}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              onCustomImageUpload={handleCustomImageUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-white/20"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-3 space-y-8 max-w-7xl">
        {/* Main Content - Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Countdown Section */}
          <div className="lg:col-span-2 text-center space-y-8">
            {/* Motivational Quote */}
            <div>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                <CardContent>
                  <Quote className="h-8 w-8 mx-auto mb-4 text-white/80" />
                  <blockquote className="text-xl md:text-2xl font-medium italic mb-3">
                    "{motivationalQuotes[currentQuote].quote}"
                  </blockquote>
                  <cite className="text-white/80 text-lg">— {motivationalQuotes[currentQuote].author}</cite>
                  <p className="text-white/60 text-sm mt-2 italic">{motivationalQuotes[currentQuote].translation}</p>
                </CardContent>
              </Card>
            </div>

            {/* Exam Date */}
            <div>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                <CardContent>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                        {currentExam ? `Môn thi tiếp theo: ${currentExam.subject}` : "Ngày thi chính thức"}
                      </p>
                      <p className="text-white text-xl font-bold">
                        {currentExam ? currentExam.date : "26/6/2026"}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-3 py-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {currentExam ? currentExam.time : "07:30"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Countdown Timer */}
            <div>
              <h2 className="text-white/90 text-xl mb-6 font-medium">
                {currentExam ? `Thời gian còn lại đến môn thi ${currentExam.subject}` : "Thời gian còn lại đến kỳ thi"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 xl:p-8 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{timeLeft.days}</div>
                  <div className="text-white/80 uppercase tracking-wider text-xs lg:text-sm font-medium">NGÀY</div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 xl:p-8 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{timeLeft.hours}</div>
                  <div className="text-white/80 uppercase tracking-wider text-xs lg:text-sm font-medium">GIỜ</div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 xl:p-8 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{timeLeft.minutes}</div>
                  <div className="text-white/80 uppercase tracking-wider text-xs lg:text-sm font-medium">PHÚT</div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 xl:p-8 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{timeLeft.seconds}</div>
                  <div className="text-white/80 uppercase tracking-wider text-xs lg:text-sm font-medium">GIÂY</div>
                </div>
              </div>
            </div>

            {/* Motivational Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-2 hover:bg-emerald-500/30 transition-colors">
                <Star className="h-4 w-4 mr-2" />
                Nỗ lực mỗi ngày
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 px-4 py-2 hover:bg-blue-500/30 transition-colors">
                <Users className="h-4 w-4 mr-2" />
                Đồng hành cùng nhau
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-100 border-purple-400/30 px-4 py-2 hover:bg-purple-500/30 transition-colors">
                <Target className="h-4 w-4 mr-2" />
                Hướng tới thành công
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-100 border-orange-400/30 px-4 py-2 hover:bg-orange-500/30 transition-colors">
                <Zap className="h-4 w-4 mr-2" />
                Tin tưởng bản thân
              </Badge>
            </div>
          </div>

          {/* Right Column - Exam Schedule Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 h-fit sticky top-4">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lịch thi tổng quan 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {examTypes.flatMap(examType =>
                    examType.enabled ? examType.sessions.filter(s => s.enabled) : []
                  ).sort((a, b) => {
                    const aTime = a.datetime instanceof Date ? a.datetime.getTime() : new Date(a.datetime).getTime()
                    const bTime = b.datetime instanceof Date ? b.datetime.getTime() : new Date(b.datetime).getTime()
                    return aTime - bTime
                  }).map((session) => (
                    <div
                      key={session.id}
                      className={`p-3 rounded-lg border transition-all duration-300 ${currentExam?.id === session.id
                          ? 'bg-blue-500/20 border-blue-400/50 ring-2 ring-blue-400/30'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-xl">{session.icon}</div>
                          <div>
                            <h3 className="text-white font-semibold">{session.subject}</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-white/70">
                              <span>{session.date}</span>
                              <span>•</span>
                              <span>{session.time}</span>
                              {session.duration && (
                                <>
                                  <span>•</span>
                                  <span>{session.duration}</span>
                                </>
                              )}
                            </div>
                            {session.description && (
                              <p className="text-xs text-white/60 mt-1">{session.description}</p>
                            )}
                            {session.locations && (
                              <p className="text-xs text-white/50 mt-1">📍 {session.locations}</p>
                            )}
                          </div>
                        </div>
                        {currentExam?.id === session.id && (
                          <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30">
                            Đang đếm ngược
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* News Section */}
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          <NewsSection articles={newsArticles} />
        </div>

        {/* Study Tips */}
        <section className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl">Mẹo học tập hiệu quả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="text-white font-semibold mb-2">Đọc hiểu sâu</h3>
                  <p className="text-white/70 text-sm">Ghi chú và tóm tắt những điểm quan trọng khi đọc</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">⏰</div>
                  <h3 className="text-white font-semibold mb-2">Quản lý thời gian</h3>
                  <p className="text-white/70 text-sm">Sử dụng kỹ thuật Pomodoro để tập trung học tập</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">🧘</div>
                  <h3 className="text-white font-semibold mb-2">Giữ bình tĩnh</h3>
                  <p className="text-white/70 text-sm">Thực hành thiền định và bài tập thở</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Exam Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/20 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Lọc kỳ thi</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterModalOpen(false)}
                className="h-8 w-8"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tempExamTypes.map((examType) => (
                  <div key={examType.id} className="space-y-2">
                    {/* Exam Type Header with Toggle */}
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={examType.enabled}
                          onChange={() => toggleExamType(examType.id)}
                          className="w-5 h-5 rounded"
                        />
                        <div>
                          <span className="font-semibold">{examType.shortName}</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{examType.name}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {examType.sessions.filter(s => s.enabled).length}/{examType.sessions.length}
                      </Badge>
                    </div>

                    {/* Exam Sessions */}
                    {examType.enabled && (
                      <div className="space-y-1 ml-6">
                        {examType.sessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={session.enabled}
                              onChange={() => toggleExamSession(examType.id, session.id)}
                              className="w-4 h-4 rounded mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-start gap-2">
                                <span className="text-lg flex-shrink-0">{session.icon}</span>
                                <div className="flex-1">
                                  <h3 className="font-medium text-sm">{session.subject}</h3>
                                  <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    <span>{session.date}</span>
                                    <span>•</span>
                                    <span>{session.time}</span>
                                    {session.duration && (
                                      <>
                                        <span>•</span>
                                        <span>{session.duration}</span>
                                      </>
                                    )}
                                  </div>
                                  {session.description && (
                                    <p className="text-xs text-gray-500 mt-1">{session.description}</p>
                                  )}
                                  {session.locations && (
                                    <p className="text-xs text-gray-500 mt-1">📍 {session.locations}</p>
                                  )}
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
                    const resetExamTypes = allExamTypes.map(et => ({
                      ...et,
                      enabled: et.id === 'thptqg',
                      sessions: et.sessions.map(s => ({ ...s, enabled: et.id === 'thptqg' }))
                    }))
                    setTempExamTypes(resetExamTypes)
                  }}
                >
                  Đặt lại mặc định
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={saveExamTypes}>
                    Lưu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-center md:text-left mb-4 md:mb-0">

            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/70 ">
                <Heart className="h-4 w-4 mr-2" />
                Ủng hộ
              </Button>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                  <Link href="https://github.com/anhkhoatqt11/demnguockithi/tree/master" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}