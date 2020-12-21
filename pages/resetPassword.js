import { useState } from 'react'
import { useRouter } from 'next/router' 
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
import { resetPasswordSchema as schema } from '@/validator/schemas'
import { getErrors, getValuesBlured } from './register'
import { resetPassword } from '@/apis/auth'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column'
  },
  continueBtn: {
    marginTop: theme.spacing(3)
  }
}))

const initialErrors = {
  passwordErr: '',
  rePasswordErr: ''
}

const initialData = {
  password: '',
  rePassword: '',
  ...initialErrors
}

const initialBlured = {
  passwordErr: false,
  rePasswordErr: false
}

export default function ResetPassword () {

  const [inputsData, setInputsData] = useState(initialData)
  const [showPassword, setShowPassword] = useState()
  const [blured, setBlured] = useState(initialBlured)
  const [passwordChanged, setPasswordChanged] = useState(false)
  
  const classes = useStyles()
  const router = useRouter()

  const { w } = router.query

  const handleBlur = field => () => {
    if (!blured[field]) {
      setBlured({...blured, [field]: true})
    }
  }

  const handleChange = prop => async e => {
    const value = e.target.value
    const newInputsData = {
      ...inputsData,
      [prop]: value
    }
    if (blured[prop]) {
      const values = await getValuesBlured(newInputsData, blured)
      const { errors } = await getErrors(values, schema, {...initialErrors})
      setInputsData({...newInputsData, ...errors})
    } else {
      setInputsData(newInputsData)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setBlured({ password: true, rePassword: true })
    const { passwordErr, rePasswordErr, ...values } = inputsData
    const { errors, hasError } = await getErrors(values, schema, {...initialErrors})
    if (hasError) {
      setInputsData({...inputsData, ...errors})
    } else {
      const { ok } = await resetPassword({...values, tok: w})
      if (ok) {
        setPasswordChanged(true)
      }
    }
  }

  if (passwordChanged) {
    return (
      <Grid container direction='column' alignItems='center' >
        <Typography variant='body1' >
          Գաղտնաբառը փոփոխված է, կարող եք մուտք գործել
        </Typography>
        <Button className={classes.continueBtn} onClick={() => router.push('/login')} >
          Շարունակել
        </Button>
      </Grid>
    )
  }

  return (
    <Grid container direction='column' alignItems='center' >
      <Typography variant='h5' >
        Գաղտնաբառի փոփոխություն
      </Typography>
      <Typography variant='overline' >
        Նշեք Ձեր Էլ․ հասցեն կարգավորումներ ստանալու համար 
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate >
        <Grid container direction='column' >
          <FormControl variant='outlined' margin='normal' error={!!inputsData.passwordErr} >
            <InputLabel htmlFor='password' >Գաղտնաբառ</InputLabel>
            <OutlinedInput 
              id='password' 
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              value={inputsData.password}
              labelWidth={120}
              endAdornment={
                <InputAdornment position='end' >
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText  >{inputsData.passwordErr}</FormHelperText>
          </FormControl>
          <FormControl variant='outlined' margin='normal' error={!!inputsData.rePasswordErr} >
            <InputLabel htmlFor='rePassword' >Գաղտնաբառի կրկնություն</InputLabel>
            <OutlinedInput 
              id='rePassword' 
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('rePassword')}
              onBlur={handleBlur('rePassword')}
              value={inputsData.rePassword}
              labelWidth={235}
              endAdornment={
                <InputAdornment position='end' >
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText  >{inputsData.rePasswordErr}</FormHelperText>
          </FormControl>
        </Grid>
        <Button 
          type='submit'
          > 
          Հաստատել
        </Button>
      </form>
    </Grid>
  )
}