'use Client'

import { UserNav } from '../common/user-nav'

export default function UserAppHeader() {
  return (
    <header>
      <nav className="m-4 flex items-center justify-between">
        <span className="font-extrabold">
          D<span className="font-extralight">erp</span>
        </span>
        <UserNav />
      </nav>
    </header>
  )
}
