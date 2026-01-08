'use client'

import styles from './Clips.module.css'

interface Clip {
    id: string
    embedId: string
    title: string
    streamer: string
    views: number
    likes: number
}

export default function FeaturedClip({ clip }: { clip: Clip }) {
    if (!clip) return null

    return (
        <section className={styles.featuredContainer}>
            <div className={styles.featuredPlayerWrapper}>
                {/* 
            To crop the video, we use a wrapper with overflow hidden and absolute positioning for the iframe.
            We scale the iframe slightly to fill/crop.
            We also include parent params for localhost and vercel deployments.
         */}
                <div className={styles.featuredCrop}>
                    <iframe
                        src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=localhost&parent=clipfails.vercel.app&parent=${typeof window !== 'undefined' ? window.location.hostname : ''}&autoplay=true&muted=true`}
                        height="100%"
                        width="100%"
                        allowFullScreen={true}
                        style={{ border: 'none', position: 'absolute', top: '-15%', height: '130%', width: '100%' }}
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
                        <span>{clip.views.toLocaleString()} watching</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
