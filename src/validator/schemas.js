import yup from '.'

export const registerSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(7).max(33).matches(/^[a-z0-9!@#$%^&*]*$/i, {message: 'Պետք է պարունակի միայն տառ, թիվ կամ սիմվոլ'}),
  rePassword: yup.string().test('passwords-match', 'Գաղտնաբառերը պետք է համընկնեն', function(value) {
    return this.parent.password === value
  })
})

export const loginSchema = yup.object().shape({
  username: yup.string().required().email(),
  password: yup.string().min(7).max(33).matches(/^[a-z0-9!@#$%^&*]*$/i, {message: 'Պետք է պարունակի միայն տառ, թիվ կամ սիմվոլ'})
})

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(7).max(33).matches(/^[a-z0-9!@#$%^&*]*$/i, {message: 'Պետք է պարունակի միայն տառ, թիվ կամ սիմվոլ'}),
  rePassword: yup.string().test('passwords-match', 'Գաղտնաբառերը պետք է համընկնեն', function(value) {
    return this.parent.password === value
  })
})

export const emailSchema = yup.object().shape({
  email: yup.string().required().email()
})