import { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import theme from '../src/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  }
}))

// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const classes = useStyles()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root} component='main' >
        <CssBaseline />
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  ) 
}

export default MyApp
