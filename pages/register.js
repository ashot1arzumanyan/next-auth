import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column'
  }
}))

yup.setLocale({
  mixed: {
    required: 'Տվյալ դաշտը պարտադիր է'
  },
  string: {
    email: 'Տվյալ դաշտը պետք է լինի վավեր էլ․ հասցե',
    min: 'Տվյալ դաշտը պետք է պարունակի ամենաքիչը 7 նիշ',
    max: 'Տվյալ դաշտը պետք է պարունակի ամենաշատը 33 նիշ'
  }
})

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(7).max(33).matches(/[a-z0-9]\S$/i, {message: 'Պետք է պարունակի միայն տառ, թիվ կամ սիմվոլ'}),
  rePassword: yup.string().test('passwords-match', 'Գաղտնաբառերը պետք է համընկնեն', function(value) {
    return this.parent.password === value
  })
})

const initialData = {
  email: '',
  password: '',
  rePassword: ''
}

export default function Register() {

  const classes = useStyles()

  const [showPassword, setShowPassword] = useState()
  const [values, setValues] = useState(initialData)
  const [errors, setErrors] = useState(initialData)

  const handleChange = prop => e => {
    setValues({...values, [prop]: e.target.value})
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(values)
    schema.validate(values, {abortEarly: false}).then(res => {
      console.log('res', res)
    }).catch(err => {
      const obj = {...initialData}
      err.inner.forEach(i => {
        obj[i.path] = i.message
      })
      setErrors(obj)
      console.log(err)      
    })
  }

  return (
    <Grid container direction='column' alignItems='center' >
      <Typography component='h1' variant='h5' >
        Գրանցում
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate >
        <Grid container direction='column' >
          <TextField 
            onChange={handleChange('email')}
            value={values.email}
            label='Էլ․ հասցե' 
            variant='outlined' 
            margin='normal' 
            error={!!errors.email}
            helperText={errors.email}
          />
          <FormControl variant='outlined' margin='normal' error={!!errors.password} >
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
            <FormHelperText  >{errors.password}</FormHelperText>
          </FormControl>
          <FormControl variant='outlined' margin='normal' error={!!errors.rePassword} >
            <InputLabel htmlFor='rePassword' >Գաղտնաբառի կրկնություն</InputLabel>
            <OutlinedInput 
              id='rePassword' 
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('rePassword')}
              value={values.rePassword}
              labelWidth={235}
              endAdornment={
                <InputAdornment position='end' >
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText  >{errors.rePassword}</FormHelperText>
          </FormControl>
        </Grid>
        <Button 
          type='submit'
          > 
          Գրանցվել
        </Button>
      </form>
    </Grid>
  )
}