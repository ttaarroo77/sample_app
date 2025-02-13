import Link from 'next/link'
import { HomeIcon, CogIcon, UserIcon, CalendarIcon, BellIcon } from '@heroicons/react/outline'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <a className="text-gray-700 hover:text-gray-900">
            <HomeIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/mypage">
          <a className="text-gray-700 hover:text-gray-900">
            <CogIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/profile">
          <a className="text-gray-700 hover:text-gray-900">
            <UserIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/calendar">
          <a className="text-gray-700 hover:text-gray-900">
            <CalendarIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/notifications">
          <a className="text-gray-700 hover:text-gray-900">
            <BellIcon className="h-6 w-6" />
          </a>
        </Link>
      </div>
    </header>
  )
} 