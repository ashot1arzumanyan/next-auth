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

import { registerSchema as schema } from '@/utils/validator/schemas'
import { register } from '@/apis/auth'
// import { setCsrf } from '@/middleware/csrf'

const useStyles = makeStyles(() => ({
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column'
  }
}))

const initialErrors = {
  emailErr: '',
  passwordErr: '',
  rePasswordErr: ''
}

const initialData = {
  email: '',
  password: '',
  rePassword: '',
  ...initialErrors
}

const initialBlured = {
  emailErr: false,
  passwordErr: false,
  rePasswordErr: false
}

export const getErrors = async (values, schemaLocal, errors) => {
  let hasError = false
  const newErrors = { ...errors }
  try {
    await schemaLocal.validate(values, { abortEarly: false })
  } catch (err) {
    hasError = true
    err.inner.forEach(i => {
      const errorName = `${i.path}Err`
      newErrors[errorName] = i.message
    })
  }
  return { errors: newErrors, hasError }
}

export const getValuesBlured = (inputsData, blured) => {
  const values = {}
  Object.keys(inputsData).forEach(key => {
    if (blured[key]) {
      values[key] = inputsData[key]
    }
  })
  return values
}

export default function Register() {
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState()
  const [inputsData, setInputsData] = useState(initialData)
  const [blured, setBlured] = useState(initialBlured)

  const handleBlur = field => () => {
    if (!blured[field]) {
      setBlured({ ...blured, [field]: true })
    }
  }

  const handleChange = prop => async e => {
    const { value } = e.target
    const newInputsData = {
      ...inputsData,
      [prop]: value
    }
    if (blured[prop]) {
      const values = await getValuesBlured(newInputsData, blured)
      const { errors } = await getErrors(values, schema, { ...initialErrors })
      setInputsData({ ...newInputsData, ...errors })
    } else {
      setInputsData(newInputsData)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setBlured({ email: true, password: true, rePassword: true })
    const { emailErr, passwordErr, rePasswordErr, ...values } = inputsData
    const { errors, hasError } = await getErrors(values, schema, { ...initialErrors })
    if (hasError) {
      setInputsData({ ...inputsData, ...errors })
    } else {
      register(values)
        .then(console.log)
        .catch(console.log)
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Typography component="h1" variant="h5">
        Գրանցում
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <Grid container direction="column">
          <TextField
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            value={inputsData.email}
            label="Էլ․ հասցե"
            variant="outlined"
            margin="normal"
            error={!!inputsData.emailErr}
            helperText={inputsData.emailErr}
          />
          <FormControl variant="outlined" margin="normal" error={!!inputsData.passwordErr}>
            <InputLabel htmlFor="password">Գաղտնաբառ</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
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
            <FormHelperText>{inputsData.passwordErr}</FormHelperText>
          </FormControl>
          <FormControl variant="outlined" margin="normal" error={!!inputsData.rePasswordErr}>
            <InputLabel htmlFor="rePassword">Գաղտնաբառի կրկնություն</InputLabel>
            <OutlinedInput
              id="rePassword"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('rePassword')}
              onBlur={handleBlur('rePassword')}
              value={inputsData.rePassword}
              labelWidth={235}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
            <FormHelperText>{inputsData.rePasswordErr}</FormHelperText>
          </FormControl>
        </Grid>
        <Button type="submit">
          Գրանցվել
        </Button>
      </form>
    </Grid>
  )
}
