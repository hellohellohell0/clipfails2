'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')

    if (username === 'ADMIN' && password === 'securepass') {
        // Set cookie
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })
        redirect('/admin/dashboard')
    } else {
        return { message: 'Invalid credentials' }
    }
}

export async function logout() {
    (await cookies()).delete('admin_session')
    redirect('/admin')
}
