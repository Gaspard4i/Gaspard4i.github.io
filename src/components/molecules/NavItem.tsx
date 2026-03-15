import { NavLink } from 'react-router-dom'

interface NavItemProps {
  to: string
  label: string
  onClick?: () => void
}

export default function NavItem({ to, label, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `btn btn-ghost btn-sm font-medium transition-colors ${
          isActive ? 'text-primary' : 'text-base-content'
        }`
      }
    >
      {label}
    </NavLink>
  )
}
