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
            <div className={styles.featuredPlayer}>
                <iframe
                    src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=localhost&parent=clipfails.vercel.app&autoplay=true&muted=true`}
                    height="100%"
                    width="100%"
                    allowFullScreen={true}
                    style={{ border: 'none' }}
                />
            </div>
            <div className={styles.featuredInfo}>
                <div className={styles.featuredLabel}>Featured Clip</div>
                <h1 className={styles.featuredTitle}>{clip.title}</h1>
                <p className={styles.featuredStreamer}>{clip.streamer}</p>
                <div className={styles.featuredStats}>
                    <span>{clip.views.toLocaleString()} Currently Watching</span>
                </div>
            </div>
        </section>
    )
}
