import { GovUKPanel, GovUKBody } from '@ministryofjustice/hmpps-forge/govuk-components'

export const panel = GovUKPanel({
  titleText: 'Registration complete',
  html: 'Your personal registration has been successfully submitted',
})

export const description = GovUKBody({
  text: 'Thank you for completing your registration details.',
})
