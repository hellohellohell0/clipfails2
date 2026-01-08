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

    // Ensure robust parent list
    // Add common vercel suffixes if needed, but 'clipfails.vercel.app' is main.
    // Localhost, and current hostname dynamically.

    return (
        <section className={styles.featuredContainer}>
            <div className={styles.featuredPlayerWrapper}>
                <div className={styles.featuredCrop}>
                    <iframe
                        src={`https://clips.twitch.tv/embed?clip=${clip.embedId}&parent=localhost&parent=127.0.0.1&parent=clipfails.vercel.app&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true&muted=true`}
                        height="100%"
                        width="100%"
                        allowFullScreen={true}
                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                </div>
                {/* Gradient is strictly visual, ensure it doesn't block clicks if we want interaction (though often overlay blocks iframe interaction to prevent stealing focus, but user might want controls. User said "let you play/pause is only for grid items expanding". Featured is auto-play muted usually. "You can crop the video... make it flatter".
            If I remove pointer-events: none from overlay, I can block interaction.
            Actually, user complained "clips embedding url... refused to connect".
            I will keep overlay pointer-events-none so controls MIGHT work if z-index allows.
         */}
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
                        <span>{clip.views.toLocaleString()} Views</span>
                        <span>{clip.likes.toLocaleString()} Likes</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
