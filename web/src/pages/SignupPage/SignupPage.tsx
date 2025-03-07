import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  EmailField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from 'src/components/ShowHidePassword/ShowHidePassword'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <HeaderWithRulers className="mb-8 text-white" heading="SIGNUP"/>
          <Form onSubmit={onSubmit} className="auth-form">
            <div className='field'>
            <Label
              name="email"
              errorClassName="error"
            >
              Email
            </Label>
            <EmailField
              name="email"
              placeholder=''
              errorClassName="error"
              ref={emailRef}
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
            />
            <FieldError name="email" className="error-message" />
            </div>
            
            <div className='field'>
            <ShowHidePassword
              name="password"
              label='Password'
              className="rw-input"
              placeholder=''
              errorClassName="rw-input rw-input-error"
              autoComplete="current-password"
              validation={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
              }}
            />
            <FieldError name="password" className="error-message" />
            </div>

            
              <Submit>
                Sign Up
              </Submit>
          </Form>
          <div className="auth-links">
            <Link to={routes.login()}>
              Ready to Login
            </Link>
          </div>
    </>
  )
}

export default SignupPage
