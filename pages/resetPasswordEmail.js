import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { emailSchema } from '@/validator/schemas'
import { resetPasswordEmail } from '@/apis/auth'

const useStyles = makeStyles((theme) => ({
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

export default function ResetPasswordEmail () {

  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [blured, setBlured] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const classes = useStyles()

  const handleChange = async e => {
    const value = e.target.value
    if (blured) {
      try {
        await emailSchema.validate({email: value})
        setEmailErr('')
      } catch (err) {
        setEmailErr(err.message)
      }
    }
    setEmail(value)
  }

  const handleBlur = () => {
    if (!blured) {
      setBlured(true)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    handleBlur()
    try {
      await emailSchema.validate({ email })
      const { ok } = await resetPasswordEmail({ email })
      if (ok) {
        setEmailSent(true)
      }
    } catch (err) {
      setEmailErr(err.message)
    }
  }

  if (emailSent) {
    return (
      <Grid container justify='center' alignItems='center' >
        <Typography variant='body1' >
          Ստուգեք Ձեր էլ․ հասցեն և հետևեք ցուցումներին
        </Typography>
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
          <TextField 
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
            label='Էլ․ հասցե' 
            variant='outlined' 
            margin='normal' 
            error={!!emailErr}
            helperText={emailErr}
          />
        </Grid>
        <Button 
          type='submit'
          > 
          ՈԻղարկել կարգավորումներ
        </Button>
      </form>
    </Grid>
  )
}