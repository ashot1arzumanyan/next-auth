import smtp from '@sendgrid/mail'

smtp.setApiKey(process.env.SENDGRID_API_KEY)

export default smtp