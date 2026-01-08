import prisma from './lib/prisma'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const featuredClip = await prisma.clip.findFirst({
        where: { isFeatured: true },
    })

    // Get other clips (excluding featured if exists)
    const clips = await prisma.clip.findMany({
        where: featuredClip ? { id: { not: featuredClip.id } } : {},
        orderBy: { createdAt: 'desc' },
    })

    return (
        <HomeClient featuredClip={featuredClip} clips={clips} />
    )
}

<script src="logger.js"></script>