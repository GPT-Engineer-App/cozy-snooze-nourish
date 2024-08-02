import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { useKidsByParent } from '@/integrations/supabase'

const Index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const navigate = useNavigate()
  const { refetch: refetchKids } = useKidsByParent()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSignUpSuccess(false)
    const response = await supabase.auth.signUp({ email, password })
    console.log('Sign up response:', response)
    if (response.error) {
      setError(response.error.message)
    } else {
      setSignUpSuccess(true)
    }
    setLoading(false)
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      await refetchKids()
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-0">
      <Card className="w-[350px] bg-green-500 text-white">
        <CardHeader>
          <CardTitle className="text-white">Baby Tracker</CardTitle>
          <CardDescription className="text-green-100">Sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="bg-green-400 text-white placeholder-green-200" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="bg-green-400 text-white placeholder-green-200" />
              </div>
            </div>
          </form>
          {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          {signUpSuccess && (
            <Alert className="mt-4 bg-green-400 text-white border-green-300">
              <AlertDescription>
                Sign up successful! Please check your email for a confirmation link.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSignUp} disabled={loading} className="text-white border-white hover:bg-green-600">Sign Up</Button>
          <Button onClick={handleSignIn} disabled={loading} className="bg-white text-green-500 hover:bg-green-100">Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Index
