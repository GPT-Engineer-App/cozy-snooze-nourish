import React from 'react'
import SleepTracker from '@/components/SleepTracker'
import FoodTracker from '@/components/FoodTracker'
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabase'

const Dashboard = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[800px] bg-green-500 rounded-lg shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Baby Tracker Dashboard</h1>
          <Button onClick={handleSignOut} variant="secondary">Sign Out</Button>
        </div>
        <div className="space-y-8">
          <div className="bg-green-400 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Sleep Tracker</h2>
            <SleepTracker />
          </div>
          <div className="bg-green-400 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Food Tracker</h2>
            <FoodTracker />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
