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
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
      <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Baby Tracker Dashboard</h1>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
        <div className="space-y-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Sleep Tracker</h2>
            <SleepTracker />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Food Tracker</h2>
            <FoodTracker />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
