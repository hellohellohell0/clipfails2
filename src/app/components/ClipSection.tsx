'use client'

import { useState, useCallback } from 'react'
import styles from './Clips.module.css'

interface Clip {
    id: string
    embedId: string
    title: string
    streamer: string
    views: number
    likes: number
    isFeatured: boolean
}

function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
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
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function ClipCard({ clip, onPlay }: { clip: Clip, onPlay: (clip: Clip, currentLikes: number, isLiked: boolean) => void }) {
    const [localLikes, setLocalLikes] = useState(clip.likes)
    const [isLiked, setIsLiked] = useState(false)

    // Prevent event propagation so clicking heart doesn't open modal
    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isLiked) {
            setLocalLikes(n => n + 1)
            setIsLiked(true)
        }
    }

    return (
        <div className={styles.card} onClick={() => onPlay(clip, localLikes, isLiked)}>
            <div className={styles.thumbnailPlaceholder}>
                {/* Direct video thumbnail preview */}
                <iframe
                    src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=${window.location.hostname}`}
                    title={clip.title}
                    className={styles.cardIframe}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        pointerEvents: 'none'
                    }}
                />
            </div>
            <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{clip.title}</h3>
                <p className={styles.cardStreamer}>{clip.streamer}</p>
                <div className={styles.stats}>
                    <span className={styles.statItem}><EyeIcon /> {clip.views.toLocaleString()}</span>
                    <span
                        className={`${styles.statItem} ${styles.interactive}`}
                        onClick={handleLike}
                    >
                        <HeartIcon filled={isLiked} /> {localLikes.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function ClipSection({
    clips,
    playingClip,
    onPlayClip,
    onCloseModal,
    playingLikes,
    playingIsLiked,
    onModalLike
}: {
    clips: Clip[],
    playingClip: Clip | null,
    onPlayClip: (clip: Clip, likes: number, isLiked: boolean) => void,
    onCloseModal: () => void,
    playingLikes?: number,
    playingIsLiked?: boolean,
    onModalLike?: () => void
}) {

    // Reset modal like state when opening new clip
    const handleModalOpen = (clip: Clip, currentLikes: number, isLiked: boolean) => {
        onPlayClip(clip, currentLikes, isLiked)
    }

    const handleModalLike = () => {
        if (onModalLike) onModalLike()
    }

    return (
        <>
            <div className={styles.grid}>
                {clips.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} onPlay={handleModalOpen} />
                ))}
            </div>

            {playingClip && (
                <div className={styles.modalBackdrop} onClick={onCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={onCloseModal}>×</button>
                        <div className={styles.modalPlayer}>
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${playingClip.embedId}&parent=localhost&parent=127.0.0.1&parent=clipfails.vercel.app&parent=clipfails.com&parent=www.clipfails.com&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true`}
                                height="100%"
                                width="100%"
                                allowFullScreen={true}
                                style={{ border: 'none' }}
                            />
                        </div>
                        <div className={styles.modalInfo}>
                            <h2>{playingClip.title}</h2>
                            <p className={styles.modalStreamer}>Streamed by <strong>{playingClip.streamer}</strong></p>
                            <div className={styles.modalStats}>
                                <span><EyeIcon /> {playingClip.views.toLocaleString()}</span>
                                <span
                                    className={styles.interactive}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    onClick={handleModalLike}
                                >
                                    <HeartIcon filled={!!playingIsLiked} /> {playingLikes?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
