"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, RefreshCw } from "lucide-react"
import Link from "next/link"

// Types for news articles
export interface NewsArticle {
    id: number
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    priority: "high" | "medium" | "low"
    articleUrl: string
}

interface NewsSectionProps {
    articles: NewsArticle[]
}

export function NewsSection({ articles }: NewsSectionProps) {
    // Check if news is too old (more than 14 days)
    const isNewsOutdated = () => {
        if (articles.length === 0) return false
        
        const today = new Date()
        const mostRecentDate = new Date(
            Math.max(...articles.map(article => new Date(article.date).getTime()))
        )
        
        const daysDifference = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24))
        return daysDifference > 14
    }

    const newsOutdated = isNewsOutdated()

    return (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Tin tức & Thông báo mới nhất
                    </CardTitle>
                    {newsOutdated && (
                        <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30 flex items-center gap-1 animate-pulse">
                            <RefreshCw className="h-3 w-3" />
                            Đang cập nhật
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                        <Link key={article.id} href={article.articleUrl} className="no-underline" target="_blank" rel="noopener noreferrer">
                            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all border border-white/10">
                                <div className="flex items-center justify-between mb-3">
                                    <Badge
                                        variant="outline"
                                        className={`border-white/30 text-white/90 ${article.priority === "high" ? "bg-red-500/20" : "bg-blue-500/20"
                                            }`}
                                    >
                                        {article.category}
                                    </Badge>
                                    <span className="text-white/60 text-sm">{article.readTime}</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                                <p className="text-white/70 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/50 text-xs">{article.date}</span>
                                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/20">
                                        Đọc thêm
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
