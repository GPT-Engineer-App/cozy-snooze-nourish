import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

const FoodTracker = () => {
  const [foodItem, setFoodItem] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('food_records')
      .insert([
        { food_item: foodItem, amount: amount }
      ])
    
    if (error) console.error('Error inserting food record:', error)
    else {
      console.log('Food record inserted:', data)
      setFoodItem('')
      setAmount('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={foodItem}
        onChange={(e) => setFoodItem(e.target.value)}
        placeholder="Food Item"
      />
      <Input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <Button type="submit">Log Food</Button>
    </form>
  )
}

export default FoodTracker
