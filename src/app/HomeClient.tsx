'use client'

import FeaturedClip from './components/FeaturedClip'
import ClipSection from './components/ClipSection'
import { useState } from 'react'

export default function HomeClient({ featuredClip, clips }: { featuredClip: any, clips: any[] }) {
    // We lift the "modal" state here so FeaturedClip can also trigger it
    const [playingClip, setPlayingClip] = useState<any | null>(null)
    const [playingLikes, setPlayingLikes] = useState(0)
    const [playingIsLiked, setPlayingIsLiked] = useState(false)

    const handlePlayClip = (clip: any, likes: number, isLiked: boolean) => {
        setPlayingClip(clip)
        setPlayingLikes(likes)
        setPlayingIsLiked(isLiked)
    }

    const handleModalLike = () => {
        if (!playingIsLiked) {
            setPlayingLikes(n => n + 1)
            setPlayingIsLiked(true)
        }
    }

    return (
        <>
            <FeaturedClip
                key={featuredClip?.id}
                clip={featuredClip}
                onPlay={(likes, isLiked) => handlePlayClip(featuredClip, likes, isLiked)}
            />

            <div className="container" style={{ marginBottom: '4rem' }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '2rem',
                    fontWeight: '800',
                    background: 'linear-gradient(to right, white, #a1a1aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Recommended Clips
                </h2>
                <ClipSection
                    clips={clips}
                    onPlayClip={handlePlayClip}
                    playingClip={playingClip}
                    onCloseModal={() => setPlayingClip(null)}
                    playingLikes={playingLikes}
                    playingIsLiked={playingIsLiked}
                    onModalLike={handleModalLike}
                />
            </div>
        </>
    )
}
