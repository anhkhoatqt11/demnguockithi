"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
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
    return (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tin tức & Thông báo mới nhất
                </CardTitle>
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
