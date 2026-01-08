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

function ClipCard({ clip, onPlay }: { clip: Clip, onPlay: (clip: Clip) => void }) {
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
        <div className={styles.card} onClick={() => onPlay(clip)}>
            <div className={styles.thumbnailPlaceholder}>
                <div className={styles.iframeOverlay}>
                    <span className={styles.playIcon}>▶</span>
                </div>
                {/* 
                 Security Fix: Use a 'facade' approach.
                 Instead of loading a heavy iframe that browsers block (portals/security),
                 we show a styled div. The iframe ONLY loads in the modal.
                 We try to get a thumbnail if possible, but without API key we use a placeholder.
                 Wait, we CAN try the specialized twitch thumbnail URL hack:
                 https://clips-media-assets2.twitch.tv/{embedId}-preview-480x272.jpg
                 But embedId is usually a slug (e.g. "AbstruseStupid..."). 
                 The old way: Twitch GQL or API. 
                 Fallback: Just a nice dark placeholder with channel initials? 
                 Or actually, using the iframe with pointer-events:none usually works in Chrome, but FF prevents it?
                 User said: "To protect your security...". This is X-Frame-Options.
                 If we can't show it embedded in grid, we MUST use a facade.
               */}
                <div className={styles.facade}>
                    <div className={styles.facadeText}>
                        Click to Play
                    </div>
                </div>
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
    onCloseModal
}: {
    clips: Clip[],
    playingClip: Clip | null,
    onPlayClip: (clip: Clip) => void,
    onCloseModal: () => void
}) {

    // Modal Local Likes state? 
    // Ideally if you like in modal it reflects in grid, but for "visual only" client side simplicty,
    // we can just treat them separate or let the modal have its own ephemeral like state.
    const [modalLiked, setModalLiked] = useState(false)
    const [modalLikesCount, setModalLikesCount] = useState(0)

    // Reset modal like state when opening new clip
    const handleModalOpen = (clip: Clip) => {
        setModalLiked(false)
        setModalLikesCount(clip.likes)
        onPlayClip(clip)
    }

    const handleModalLike = () => {
        if (!modalLiked) {
            setModalLikesCount(n => n + 1)
            setModalLiked(true)
        }
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
                                src={`https://clips.twitch.tv/embed?clip=${playingClip.embedId}&parent=localhost&parent=127.0.0.1&parent=clipfails.vercel.app&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true`}
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
                                    <HeartIcon filled={modalLiked} /> {modalLikesCount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
