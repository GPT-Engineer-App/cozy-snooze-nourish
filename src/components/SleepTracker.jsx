import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

const SleepTracker = () => {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('sleep_records')
      .insert([
        { start_time: startTime, end_time: endTime }
      ])
    
    if (error) console.error('Error inserting sleep record:', error)
    else {
      console.log('Sleep record inserted:', data)
      setStartTime('')
      setEndTime('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Start Time"
      />
      <Input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="End Time"
      />
      <Button type="submit">Log Sleep</Button>
    </form>
  )
}

export default SleepTracker
