import { AvailableLawyersListing } from '@/components/available-lawyers'
import { availableLawyersMetadata } from '@/lib/available-lawyers'

export function generateMetadata() {
  return availableLawyersMetadata('en')
}

export default function Page() {
  return <AvailableLawyersListing locale="en" />
}
