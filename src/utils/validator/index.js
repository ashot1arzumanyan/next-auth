import * as yup from 'yup'

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

export default yup
