import { useState } from 'react'
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

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)

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
                <ListItem button >
                  <NextLink href='/register' >
                    <ListItemText primary='Մուտք' />
                  </NextLink>
                </ListItem>
                <ListItem button >
                  <NextLink href='/register' >
                    <ListItemText primary='Գրանցում' />
                  </NextLink>
                </ListItem>
                <ListItem divider ></ListItem>
              </List>
            </Drawer>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar