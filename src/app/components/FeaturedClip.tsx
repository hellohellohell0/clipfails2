'use client'

import styles from './Clips.module.css'
import { useState, useEffect } from 'react'

interface Clip {
    id: string
    embedId: string
    title: string
    streamer: string
    views: number
    likes: number
}

function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: filled ? '#ef4444' : 'inherit' }}
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    )
}

function EyeIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


export default function FeaturedClip({ clip, onPlay }: { clip: Clip, onPlay: (likes: number, isLiked: boolean) => void }) {
    const [localLikes, setLocalLikes] = useState(clip ? clip.likes : 0)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (clip) {
            setLocalLikes(clip.likes)
            setIsLiked(false)
        }
    }, [clip])

    if (!clip) return null

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isLiked) {
            setLocalLikes(n => n + 1)
            setIsLiked(true)
        }
    }

    return (
        <section className={styles.featuredContainer} onClick={() => onPlay(localLikes, isLiked)} style={{ cursor: 'pointer' }}>
            <div className={styles.featuredPlayerWrapper}>
                <div className={styles.featuredCrop}>
                    {/* 
                      Use real thumbnail. Fallback to black if fails (handled by standard img error or just empty)
                      https://clips-media-assets2.twitch.tv/{clip.embedId}-preview-480x272.jpg
                    */}
                    {/* Iframe thumbnail preview */}
                    <iframe
                        src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=${window.location.hostname}`}
                        className={styles.cardIframe}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen
                        style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                    />
                </div>
                <div className={styles.gradientOverlay}></div>
            </div>

            <div className={styles.featuredInfo}>
                <div className={styles.featuredBadge}>
                    <span className={styles.liveDot}></span> Featured Clip
                </div>
                <h1 className={styles.featuredTitle}>{clip.title}</h1>
                <div className={styles.featuredMeta}>
                    <p className={styles.featuredStreamer}>{clip.streamer}</p>
                    <div className={styles.featuredStats}>
                        <span className={styles.iconStat}><EyeIcon /> {clip.views.toLocaleString()}</span>
                        <span
                            className={`${styles.iconStat} ${styles.interactive}`}
                            onClick={handleLike}
                        >
                            <HeartIcon filled={isLiked} /> {localLikes.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
