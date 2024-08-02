import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Settings = () => {
  return (
    <div className="bg-green-400 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Settings</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="username" className="text-white">Username</Label>
          <Input id="username" placeholder="Enter your username" className="bg-green-300 text-white placeholder-green-100" />
        </div>
        <div>
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" className="bg-green-300 text-white placeholder-green-100" />
        </div>
        <Button type="submit" className="bg-white text-green-500 hover:bg-green-100">Save Changes</Button>
      </form>
    </div>
  )
}

export default Settings
