'use server'

import prisma from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'

// Helper to extract Twitch Clip ID
function getTwitchEmbedId(url: string) {
    try {
        const u = new URL(url)
        if (u.hostname === 'clips.twitch.tv') {
            return u.pathname.slice(1) // Remove leading slash
        }
        if (u.hostname.includes('twitch.tv') && u.pathname.includes('/clip/')) {
            const parts = u.pathname.split('/clip/')
            return parts[1]
        }
        return null
    } catch (e) {
        return null
    }
}

export async function addClip(prevState: any, formData: FormData) {
    const url = formData.get('url') as string
    const title = formData.get('title') as string
    const streamer = formData.get('streamer') as string

    const isFeatured = formData.get('isFeatured') === 'on'
    let views = parseInt(formData.get('views') as string) || 0
    let likes = parseInt(formData.get('likes') as string) || 0
    const useRandomStats = formData.get('randomStats') === 'on'

    if (useRandomStats) {
        views = Math.floor(Math.random() * (1500 - 120 + 1)) + 120
        const likePercent = (Math.random() * (0.30 - 0.15) + 0.15)
        likes = Math.floor(views * likePercent)
    }

    const embedId = getTwitchEmbedId(url)
    if (!embedId) {
        return { message: 'Invalid Twitch URL' }
    }

    // If featured, unfeature others
    if (isFeatured) {
        await prisma.clip.updateMany({
            where: { isFeatured: true },
            data: { isFeatured: false },
        })
    }

    try {
        await prisma.clip.create({
            data: {
                twitchUrl: url,
                embedId: embedId,
                title: title,
                streamer: streamer || 'Unknown',
                views: views,
                likes: likes,
                isFeatured: isFeatured,
            },
        })
        revalidatePath('/')
        revalidatePath('/browse')
        revalidatePath('/admin/dashboard')
        return { message: 'Clip added successfully!' }
    } catch (e) {
        console.error(e)
        return { message: 'Error adding clip. ID might exist.' }
    }
}

export async function setRedirectUrl(prevState: any, formData: FormData) {
    const url = formData.get('url') as string

    await prisma.systemSettings.upsert({
        where: { id: 1 },
        update: { redirectUrl: url },
        create: { id: 1, redirectUrl: url },
    })

    revalidatePath('/')
    revalidatePath('/admin/dashboard')
    return { message: 'Redirect URL updated.' }
}

export async function removeRedirectUrl(prevState: any, formData?: FormData) {
    await prisma.systemSettings.update({
        where: { id: 1 },
        data: { redirectUrl: null },
    })
    revalidatePath('/')
    revalidatePath('/admin/dashboard')
    return { message: 'Redirect URL removed.' }
}

export async function deleteClip(id: string) {
    await prisma.clip.delete({ where: { id } })
    revalidatePath('/admin/dashboard')
    revalidatePath('/')
}
