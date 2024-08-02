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
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Baby Tracker Dashboard</h1>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sleep Tracker</h2>
            <SleepTracker />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Food Tracker</h2>
            <FoodTracker />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
