'use client'

import ClipSection from '../components/ClipSection'
import { useState } from 'react'

export default function BrowseClient({ clips }: { clips: any[] }) {
    const [playingClip, setPlayingClip] = useState<any | null>(null)

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <h1 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontWeight: 800,
                background: 'linear-gradient(to right, white, #a1a1aa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                Browse All Clips
            </h1>
            <ClipSection
                clips={clips}
                onPlayClip={(clip) => setPlayingClip(clip)}
                playingClip={playingClip}
                onCloseModal={() => setPlayingClip(null)}
            />
        </div>
    )
}
