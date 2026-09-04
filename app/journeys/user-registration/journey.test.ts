import { createForgePackage } from '@ministryofjustice/hmpps-forge/core/authoring'
import { ForgeTestHarness } from '@ministryofjustice/hmpps-forge/core/testing'
import { govukComponents } from '@ministryofjustice/hmpps-forge/govuk-components'
import { describe, expect, it } from 'vitest'
import { userRegistrationJourney } from './journey'

const basePackage = createForgePackage({
  journey: userRegistrationJourney,
})

function createClient() {
  return new ForgeTestHarness()
    .registerGlobalComponents(govukComponents)
    .registerPackage(basePackage)
    .createClient()
}

describe('userRegistrationJourney', () => {
  describe('user-name step', () => {
    it('should render the name step on GET', async () => {
      const client = createClient()
      const result = await client.get('/user-registration', { session: {} })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.step.title).toBe('What is your name?')
      }
    })

    it('should redirect to date-of-birth on valid POST', async () => {
      const client = createClient()
      const result = await client.post('/user-registration', {
        session: {},
        body: { fullName: 'Ada Lovelace' },
      })

      expect(result.type).toBe('redirect')
      if (result.type === 'redirect') {
        expect(result.url).toContain('/user-registration/date-of-birth')
      }
    })

    it('should show validation error when fullName is missing on POST', async () => {
      const client = createClient()
      const result = await client.post('/user-registration', {
        session: {},
        body: {},
      })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.showValidationFailures).toBe(true)
        const errors = result.getValidationErrorsByFieldCode('fullName')
        expect(errors.length).toBeGreaterThan(0)
        expect(errors[0].message).toBe('Enter your name')
      }
    })
  })

  describe('date-of-birth step', () => {
    it('should render DOB step on GET', async () => {
      const client = createClient()
      const result = await client.get('/user-registration/date-of-birth', { session: {} })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.step.title).toBe('What is your date of birth?')
      }
    })

    it('should redirect to contact-details on valid DOB POST', async () => {
      const client = createClient()
      const result = await client.post('/user-registration/date-of-birth', {
        session: {},
        body: {
          dateOfBirth: {
            day: '27',
            month: '3',
            year: '1990',
          },
        },
      })

      expect(result.type).toBe('redirect')
      if (result.type === 'redirect') {
        expect(result.url).toContain('/user-registration/contact-details')
      }
    })

    it('should show validation errors on empty DOB POST', async () => {
      const client = createClient()
      const result = await client.post('/user-registration/date-of-birth', {
        session: {},
        body: {
          dateOfBirth: {
            day: '',
            month: '',
            year: '',
          },
        },
      })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.showValidationFailures).toBe(true)
        const errors = result.getValidationErrorsByFieldCode('dateOfBirth')
        expect(errors.length).toBeGreaterThan(0)
        expect(errors[0].message).toBe('Enter your date of birth')
      }
    })
  })

  describe('contact-details step', () => {
    it('should render contact details step on GET', async () => {
      const client = createClient()
      const result = await client.get('/user-registration/contact-details', { session: {} })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.step.title).toBe('What are your contact details?')
      }
    })

    it('should redirect to address on valid email and phone POST', async () => {
      const client = createClient()
      const result = await client.post('/user-registration/contact-details', {
        session: {},
        body: {
          emailAddress: 'test@example.com',
          phoneNumber: '07123456789',
        },
      })

      expect(result.type).toBe('redirect')
      if (result.type === 'redirect') {
        expect(result.url).toContain('/user-registration/address')
      }
    })

    it('should show error for invalid email and missing phone', async () => {
      const client = createClient()
      const result = await client.post('/user-registration/contact-details', {
        session: {},
        body: {
          emailAddress: 'notanemail',
        },
      })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.showValidationFailures).toBe(true)
        const emailErrors = result.getValidationErrorsByFieldCode('emailAddress')
        expect(emailErrors[0].message).toBe('Enter a valid email address')

        const phoneErrors = result.getValidationErrorsByFieldCode('phoneNumber')
        expect(phoneErrors[0].message).toBe('Enter your phone number')
      }
    })
  })

  describe('address step', () => {
    it('should render address step on GET', async () => {
      const client = createClient()
      const result = await client.get('/user-registration/address', { session: {} })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.step.title).toBe('What is your address?')
      }
    })

    it('should redirect to confirmation on valid address POST', async () => {
      const client = createClient()
      const result = await client.post('/user-registration/address', {
        session: {},
        body: {
          addressLine1: '123 High Street',
          addressTown: 'Leeds',
          addressPostcode: 'LS1 1UR',
        },
      })

      expect(result.type).toBe('redirect')
      if (result.type === 'redirect') {
        expect(result.url).toContain('/user-registration/confirmation')
      }
    })

    it('should show error for invalid postcode and missing fields', async () => {
      const client = createClient()
      const result = await client.post('/user-registration/address', {
        session: {},
        body: {
          addressPostcode: 'invalid-postcode',
        },
      })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.showValidationFailures).toBe(true)
        const line1Errors = result.getValidationErrorsByFieldCode('addressLine1')
        expect(line1Errors[0].message).toBe('Enter the first line of your address')

        const postcodeErrors = result.getValidationErrorsByFieldCode('addressPostcode')
        expect(postcodeErrors[0].message).toBe('Enter a real postcode')
      }
    })
  })

  describe('confirmation step', () => {
    it('should render confirmation page on GET', async () => {
      const client = createClient()
      const result = await client.get('/user-registration/confirmation', { session: {} })

      expect(result.type).toBe('render')
      if (result.type === 'render') {
        expect(result.context.step.title).toBe('Registration complete')
      }
    })
  })
})
