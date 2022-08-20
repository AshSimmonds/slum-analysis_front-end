import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function SigninForm() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    const handleLogin = async (email: string) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            setEmailSent(true)
        } catch (error: any) {
            console.error(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="card w-96 bg-base-300 shadow-2xl">
            <figure><img src="https://source.unsplash.com/random/400x150?derelict" alt="junk food" /></figure>
            <div className="card-body">
                <h2 className="card-title">Sign-up / sign-in</h2>

                <div>
                    {emailSent ? (
                        <div className="prose">
                            <p>An e-mail has been sent to your e-mail address.</p>
                            <p>Please click the link in this mail to sign in.</p>
                            <p>
                                <button className="btn btn-warning" onClick={() => setEmailSent(false)}>
                                    Retry
                                </button>
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleLogin(email)
                            }}
                            className="flex flex-col space-y-4"
                        >
                            <div className="form-group">
                                <label className="label" htmlFor="email">
                                    E-mail
                                </label>
                                <div>
                                    <input
                                        id="email"
                                        className="field"
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        required
                                        disabled={loading}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    <span>{loading ? 'Processing…' : 'Send magick link'}</span>
                                </button>
                            <p>
                                To sign in or create an account, please enter your email.
                            </p>
                            <p>
                                You will receive a magick link in your mailbox.
                            </p>

                        </form>


                    )}
                </div>

            </div>
        </div>

    )
}
