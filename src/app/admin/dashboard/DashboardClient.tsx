'use client'

import { useState } from 'react'
import { addClip, setRedirectUrl, removeRedirectUrl, deleteClip } from '@/app/actions/admin'
import { logout } from '@/app/actions/auth'
import { useFormState } from 'react-dom'
import styles from './dashboard.module.css'

export default function DashboardClient({ clips, redirectUrl }: { clips: any[], redirectUrl: string | null }) {
    const [activeTab, setActiveTab] = useState<'clips' | 'redirect'>('clips')
    const [useRandomStats, setUseRandomStats] = useState(true)

    // Create wrappers for actions to manage simplistic UI state feedback
    const [addState, addAction] = useFormState(addClip, { message: '' })
    const [redirectState, redirectAction] = useFormState(setRedirectUrl, { message: '' })
    const [removeState, removeAction] = useFormState(removeRedirectUrl, { message: '' })

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <form action={logout}>
                    <button className={styles.logoutBtn}>Logout</button>
                </form>
            </header>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'clips' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('clips')}
                >
                    Manage Clips
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'redirect' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('redirect')}
                >
                    Global Redirect
                </button>
            </div>

            {activeTab === 'clips' && (
                <>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Add New Clip</h2>
                        {addState?.message && <div className={styles.statusMessage}>{addState.message}</div>}
                        <form action={addAction} className={styles.formGrid}>
                            <div className="input-group">
                                <input name="url" placeholder="Twitch Clip URL" className="input" required />
                            </div>
                            <div className="input-group">
                                <input name="title" placeholder="Clip Title" className="input" required />
                            </div>
                            <div className="input-group">
                                <input name="streamer" placeholder="Streamer Name" className="input" required />
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" name="isFeatured" id="isFeatured" />
                                <label htmlFor="isFeatured">Make Featured</label>
                            </div>

                            <div className={styles.fullWidth}>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        name="randomStats"
                                        id="randomStats"
                                        checked={useRandomStats}
                                        onChange={(e) => setUseRandomStats(e.target.checked)}
                                    />
                                    <label htmlFor="randomStats">Randomize Views/Likes</label>
                                </div>
                            </div>

                            {!useRandomStats && (
                                <>
                                    <div className="input-group">
                                        <input type="number" name="views" placeholder="Views" className="input" required min="0" />
                                    </div>
                                    <div className="input-group">
                                        <input type="number" name="likes" placeholder="Likes" className="input" required min="0" />
                                    </div>
                                </>
                            )}

                            <button type="submit" className="btn btn-primary">Add Clip</button>
                        </form>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Existing Clips</h2>
                        <div className={styles.clipList}>
                            {clips.map((clip) => (
                                <div key={clip.id} className={styles.clipItem}>
                                    <div className={styles.clipInfo}>
                                        <h3>{clip.title} {clip.isFeatured && <span className={styles.featuredBadge}>FEATURED</span>}</h3>
                                        <p>{clip.streamer} • {clip.views.toLocaleString()} views • {clip.likes.toLocaleString()} likes</p>
                                    </div>
                                    <div className={styles.actions}>
                                        <form action={deleteClip.bind(null, clip.id)}>
                                            <button className="btn btn-danger" style={{ padding: '0.5rem' }}>Delete</button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {activeTab === 'redirect' && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Global Redirect Settings</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        When active, ALL users (except admins) will be redirected to this URL immediately.
                    </p>

                    {redirectState?.message && <div className={styles.statusMessage}>{redirectState.message}</div>}

                    {redirectUrl ? (
                        <div className={styles.redirectStatus}>
                            <div>
                                <strong>Active Redirect:</strong> <a href={redirectUrl} target="_blank" rel="noreferrer">{redirectUrl}</a>
                            </div>
                            <form action={removeAction}>
                                <button className="btn btn-danger">Remove Redirect</button>
                            </form>
                        </div>
                    ) : (
                        <p style={{ marginBottom: '1rem', color: 'var(--accent)' }}>No active redirect.</p>
                    )}

                    <form action={redirectAction} style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                        <input name="url" placeholder="https://example.com" className="input" required type="url" />
                        <button className="btn btn-primary">Set Redirect</button>
                    </form>
                </section>
            )}
        </div>
    )
}
