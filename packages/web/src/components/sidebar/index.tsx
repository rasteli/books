import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Divider } from '@/components/ui/divider'
import { ProfileSection } from './profile-section'
import { Navbar } from './navbar'
import { ContinueReading } from './continue-reading'

export function Sidebar() {
  return (
    <aside className="px-12 py-8 w-[420px]">
      <ProfileSection />
      <Divider className="h-[2px] my-8" />
      <Navbar />
      <Divider className="h-[2px] my-8" />
      <ContinueReading />
      <Divider className="h-[2px] mt-8 mb-4" />
      <ThemeToggle />
    </aside>
  )
}
