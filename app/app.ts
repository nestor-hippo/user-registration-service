import express from 'express'
import session from 'express-session'
import nunjucks from 'nunjucks'
import path from 'path'
import { Forge } from '@ministryofjustice/hmpps-forge/core'
import { createExpressRouter } from '@ministryofjustice/hmpps-forge/express-nunjucks'
import { govukComponents, registerForgeGovUKComponentsGlobals } from '@ministryofjustice/hmpps-forge/govuk-components'
import userRegistrationPackage from './journeys/user-registration'

const app = express()

// 1. Session & middleware config
app.use(session({
  secret: 'hmpps-forge-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 2. Serve static assets from govuk-frontend
app.use('/govuk', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk')))

// 3. Configure Nunjucks environment search paths
const nunjucksEnv = nunjucks.configure([
  path.join(__dirname, 'views'),
  path.join(__dirname, '../node_modules/govuk-frontend/dist')
], {
  autoescape: true,
  express: app,
  noCache: true
})

// Bind Forge validation/summary globals
registerForgeGovUKComponentsGlobals(nunjucksEnv)

// 4. Initialise Forge & Mount Express router
const forge = new Forge({ logger: console, strictRegistration: true })
  .registerGlobalComponents(govukComponents)
  .registerPackage(userRegistrationPackage)

app.use('/', createExpressRouter(forge, { nunjucksEnv }))

// Redirect home route to our registration journey
app.get('/', (req, res) => {
  res.redirect('/user-registration')
})

export default app
