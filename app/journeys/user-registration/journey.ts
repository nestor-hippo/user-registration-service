import { journey } from '@ministryofjustice/hmpps-forge/core/authoring'
import { userNameStep } from './steps/user-name/step'
import { dateOfBirthStep } from './steps/date-of-birth/step'
import { contactDetailsStep } from './steps/contact-details/step'
import { addressStep } from './steps/address/step'
import { confirmationStep } from './steps/confirmation/step'

export const userRegistrationJourney = journey({
  code: 'user-registration',
  title: 'User Registration',
  path: '/user-registration',
  view: { template: 'partials/form-step' },
  steps: [userNameStep, dateOfBirthStep, contactDetailsStep, addressStep, confirmationStep],
})
