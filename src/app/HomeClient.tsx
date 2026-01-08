'use client'

import FeaturedClip from './components/FeaturedClip'
import ClipSection from './components/ClipSection'
import { useState } from 'react'

export default function HomeClient({ featuredClip, clips }: { featuredClip: any, clips: any[] }) {
    // We lift the "modal" state here so FeaturedClip can also trigger it
    const [playingClip, setPlayingClip] = useState<any | null>(null)

    return (
        <>
            <FeaturedClip
                clip={featuredClip}
                onPlay={() => setPlayingClip(featuredClip)}
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
                    onPlayClip={(clip) => setPlayingClip(clip)}
                    playingClip={playingClip}
                    onCloseModal={() => setPlayingClip(null)}
                />
            </div>
        </>
    )
}
