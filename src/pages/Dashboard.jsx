import React, { useState } from 'react'
import SleepTracker from '@/components/SleepTracker'
import FoodTracker from '@/components/FoodTracker'
import Settings from '@/components/Settings'
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon } from 'lucide-react'
import { useKidsData } from '@/integrations/supabase'

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false)
  const { data: kidsData, isLoading, isError } = useKidsData()

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[800px] bg-green-500 shadow-lg p-6 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Baby Tracker Dashboard</h1>
          <Button onClick={toggleSettings} variant="secondary">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
        {showSettings ? (
          <Settings />
        ) : (
          <div className="space-y-8">
            <div className="bg-green-400 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Sleep Tracker</h2>
              <SleepTracker />
            </div>
            <div className="bg-green-400 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Food Tracker</h2>
              <FoodTracker />
            </div>
            <div className="bg-green-400 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Kids Data</h2>
              {isLoading ? (
                <p className="text-white">Loading...</p>
              ) : isError ? (
                <p className="text-red-300">Error fetching kids data</p>
              ) : (
                <pre className="text-white overflow-x-auto">
                  {JSON.stringify(kidsData, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
