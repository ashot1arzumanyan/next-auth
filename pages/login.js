import { useState } from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import NextLink from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

import { login } from '@/apis/auth'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column'
  },
  resetPassword: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing(3)
  }
}))

const initialData = {
  username: '',
  password: ''
}

export default function Login() {
  const classes = useStyles()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState()
  const [inputsData, setInputsData] = useState(initialData)

  const handleChange = prop => async e => {
    const { value } = e.target
    setInputsData({ ...inputsData, [prop]: value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { ok, error } = await login(inputsData)
    if (ok) {
      router.push('/profile')
    } else {
      console.log(error)
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Typography component="h1" variant="h5">
        Մուտք
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <Grid container direction="column">
          <TextField
            onChange={handleChange('username')}
            value={inputsData.username}
            label="Էլ․ հասցե կամ լոգին"
            variant="outlined"
            margin="normal"
          />
          <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor="password">Գաղտնաբառ</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              value={inputsData.password}
              labelWidth={120}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Button type="submit">
          Մուտք
        </Button>
        <NextLink href="/resetPasswordEmail" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link className={classes.resetPassword} variant="body2">
            Մոռացե՞լ եք գաղտնաբառը
          </Link>
        </NextLink>
      </form>
    </Grid>
  )
}
