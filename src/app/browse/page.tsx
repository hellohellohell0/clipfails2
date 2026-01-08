import prisma from '../lib/prisma'
import BrowseClient from './BrowseClient'

export const dynamic = 'force-dynamic'

export default async function Browse() {
    const clips = await prisma.clip.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <BrowseClient clips={clips} />
    )
}
