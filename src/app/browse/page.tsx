import prisma from '../lib/prisma'
import ClipSection from '../components/ClipSection'

export default async function Browse() {
    const clips = await prisma.clip.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 800 }}>Browse All Clips</h1>
            <ClipSection clips={clips} />
        </div>
    )
}
