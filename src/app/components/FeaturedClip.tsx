'use client'

import styles from './Clips.module.css'
import { useState } from 'react'

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


export default function FeaturedClip({ clip, onPlay }: { clip: Clip, onPlay: () => void }) {
    const [localLikes, setLocalLikes] = useState(clip ? clip.likes : 0)
    const [isLiked, setIsLiked] = useState(false)

    if (!clip) return null

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isLiked) {
            setLocalLikes(n => n + 1)
            setIsLiked(true)
        }
    }

    return (
        <section className={styles.featuredContainer} onClick={onPlay} style={{ cursor: 'pointer' }}>
            <div className={styles.featuredPlayerWrapper}>
                <div className={styles.featuredCrop}>
                    {/* 
                      Use real thumbnail. Fallback to black if fails (handled by standard img error or just empty)
                      https://clips-media-assets2.twitch.tv/{clip.embedId}-preview-480x272.jpg
                    */}
                    {/* 
                      Reverting to Iframe for thumbnail since image URLs are unreliable.
                      Using pointer-events: none to ensure the container onClick fires (opening modal).
                      Autoplay=false to just show the static player.
                    */}
                    <iframe
                        src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=localhost&parent=127.0.0.1&parent=clipfails.vercel.app&parent=clipfails.com&parent=www.clipfails.com&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=false&muted=true`}
                        height="100%"
                        width="100%"
                        allowFullScreen={false}
                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                    />
                </div>
                {/* Overlay to ensure clicks are captured even if pointer-events fails */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, cursor: 'pointer' }}></div>
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
