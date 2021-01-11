import yup from '.'

function passwordsMatch(value) {
  return this.parent.password === value
}
const email = yup.string().required().email()
const username = yup.string().required().email()
const password = yup.string().min(7).max(33).matches(/^[a-z0-9!@#$%^&*]*$/i, {
  message: 'Պետք է պարունակի միայն տառ, թիվ կամ սիմվոլ'
})
const rePassword = yup.string().test('passwords-match', 'Գաղտնաբառերը պետք է համընկնեն', passwordsMatch)

export const registerSchema = yup.object().shape({ email, password, rePassword })

export const loginSchema = yup.object().shape({ username, password })

export const resetPasswordSchema = yup.object().shape({ password, rePassword })

export const emailSchema = yup.object().shape({ email })
