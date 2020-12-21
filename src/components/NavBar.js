import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { logout } from '@/apis/auth'

const NavBar = ({user}) => {

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleDrawer = () => setIsOpen(!isOpen)

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <AppBar >
      <Toolbar>
        <Grid justify='space-between' alignItems='center' container >
          <Button style={{color: 'white'}}>
            <NextLink href='/' >
              <Typography>LOGO</Typography>
            </NextLink> 
          </Button>
          <Box color='white'>
            <IconButton edge='end' onClick={toggleDrawer} style={{color: 'white'}} aria-label='menu' >
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={toggleDrawer} anchor='right' >
              <List onClick={toggleDrawer}>
                {!user ? (
                  <>
                    <ListItem button >
                      <NextLink href='/login' >
                        <ListItemText primary='Մուտք' />
                      </NextLink>
                    </ListItem>
                    <ListItem button >
                      <NextLink href='/register' >
                        <ListItemText primary='Գրանցում' />
                      </NextLink>
                    </ListItem>
                    <ListItem divider ></ListItem>
                  </>
                ) : (
                  <>
                    <ListItem button >
                      <NextLink href='/profile' >
                        <ListItemText primary='Կարգավորումներ' />
                      </NextLink>
                    </ListItem>
                    <ListItem button onClick={handleLogout} >
                      <ListItemText primary='Դուրս գալ' />
                    </ListItem>
                    <ListItem divider ></ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar