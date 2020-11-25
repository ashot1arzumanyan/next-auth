import { useState } from 'react'
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
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: '300px'
  }
}))

export default function Register() {

  const classes = useStyles()

  const [showPassword, setShowPassword] = useState()
  const [values, setValues] = useState({
    email: '',
    password: '',
    rePassword: ''
  })

  const handleChange = prop => e => {
    setValues({...values, [prop]: e.target.value})
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Grid container alignItems='center' justify='center' >
      <Grid component='form' container direction='column' className={classes.form} >
        <Grid container direction='column' >
          <TextField 
            onChange={handleChange('email')}
            value={values.email}
            label='Էլ․ հասցե' 
            variant='outlined' 
            margin='normal' 
          />
          <FormControl variant='outlined' margin='normal' >
            <InputLabel htmlFor='password' >Գաղտնաբառ</InputLabel>
            <OutlinedInput 
              id='password' 
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              value={values.password}
              labelWidth={120}
              endAdornment={
                <InputAdornment position='end' >
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant='outlined' margin='normal' >
            <InputLabel htmlFor='rePassword' >Գաղտնաբառի կրկնություն</InputLabel>
            <OutlinedInput 
              id='rePassword' 
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('rePassword')}
              value={values.password}
              labelWidth={235}
              endAdornment={
                <InputAdornment position='end' >
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Button>Գրանցվել</Button>
      </Grid>
    </Grid>
  )
}