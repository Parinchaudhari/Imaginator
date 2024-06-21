'use client'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "../ui/button"

const MediaUploder = () => {
    const { toast } = useToast()
  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export default MediaUploder