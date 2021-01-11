import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import themeDefault from '../styles/theme'
import NavBar from '../src/components/NavBar'
// import useUser from '@/hooks/useUser'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(11)
  }
}))

// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const classes = useStyles()
  const { user } = pageProps
  // const user = useUser()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={themeDefault}>
      <Container className={classes.root}>
        <CssBaseline />
        <NavBar user={user} />
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  }).isRequired
}

export default MyApp
