import prisma from './lib/prisma'
import FeaturedClip from './components/FeaturedClip'
import ClipSection from './components/ClipSection'

export default async function Home() {
    const featuredClip = await prisma.clip.findFirst({
        where: { isFeatured: true },
    })

    // Get other clips (excluding featured if it exists)
    const clips = await prisma.clip.findMany({
        where: { isFeatured: false },
        orderBy: { createdAt: 'desc' },
    })

    // If no featured clip, maybe take the first one or handle graceful fallback
    // Logic: if featured exists, use it. If not, maybe showing nothing in featured area is safer than breaking.

    return (
        <div>
            {featuredClip && <FeaturedClip clip={featuredClip} />}
            <div className="container">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: featuredClip ? 0 : '2rem' }}>Trending Clips</h2>
                <ClipSection clips={clips} />
            </div>
        </div>
    )
}
