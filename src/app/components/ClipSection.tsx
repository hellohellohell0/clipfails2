'use client'

import { useState } from 'react'
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

export default function ClipSection({ clips, featuredClip }: { clips: Clip[], featuredClip?: Clip | null }) {
    const [selectedClip, setSelectedClip] = useState<Clip | null>(null)

    return (
        <>
            <div className={styles.grid}>
                {clips.map((clip) => (
                    <div key={clip.id} className={styles.card} onClick={() => setSelectedClip(clip)}>
                        <div className={styles.thumbnailPlaceholder}>
                            <div className={styles.iframeOverlay}></div>
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=localhost&parent=127.0.0.1&parent=clipfails.vercel.app&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=false&muted=true`}
                                height="100%"
                                width="100%"
                                allowFullScreen={false}
                                style={{ border: 'none', pointerEvents: 'none' }}
                            />
                        </div>
                        <div className={styles.cardInfo}>
                            <h3 className={styles.cardTitle}>{clip.title}</h3>
                            <p className={styles.cardStreamer}>{clip.streamer}</p>
                            <div className={styles.stats}>
                                <span>👁 {clip.views.toLocaleString()}</span>
                                <span>♥ {clip.likes.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedClip && (
                <div className={styles.modalBackdrop} onClick={() => setSelectedClip(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setSelectedClip(null)}>×</button>
                        <div className={styles.modalPlayer}>
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${selectedClip.embedId}&parent=localhost&parent=127.0.0.1&parent=clipfails.vercel.app&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true`}
                                height="100%"
                                width="100%"
                                allowFullScreen={true}
                                style={{ border: 'none' }}
                            />
                        </div>
                        <div className={styles.modalInfo}>
                            <h2>{selectedClip.title}</h2>
                            <p className={styles.modalStreamer}>Streamed by <strong>{selectedClip.streamer}</strong></p>
                            <div className={styles.modalStats}>
                                <span>{selectedClip.views.toLocaleString()} Views</span>
                                <span>{selectedClip.likes.toLocaleString()} Likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
