import { createForgePackage } from '@ministryofjustice/hmpps-forge/core/authoring'
import { userRegistrationJourney } from './journey'

export default createForgePackage({
  journey: userRegistrationJourney,
})
