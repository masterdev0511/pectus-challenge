import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { NavLink } from './styles'

export default function NavBar() {
  const router = window.location

  return (
    <Box sx={{ flexGrow: 1, width: '100%', alignSelf: 'baseline' }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <NavLink
              href="/"
              sx={{ color: router.pathname === '/' ? 'yellow' : 'white' }}
            >
              Main
            </NavLink>
            <NavLink
              href="/amount"
              sx={{ color: router.pathname === '/amount' ? 'yellow' : 'white' }}
            >
              Amount
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
