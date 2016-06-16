import { MailChimpAPI } from 'mailchimp'
import mailchecker from 'mailchecker'
import emailVerify from 'email-verify'

const { API_KEY, LIST_ID } = process.env

const api = new MailChimpAPI(API_KEY, { version : '2.0' })

export function handler({ email, first_name }, context, cb) {
  if (!email) return cb(new Error('mail is empty'))

  if (!MailChecker.isValid(email)) {
    return cb(new Error('mail is invalid'))
  }

  verify(email, (err, info) => {
    if (err) return cb(err)

    const merge_vars = {
      FNAME: first_name
    }

    api.call('lists', 'subscribe', { id: LIST_ID, email: { email }, merge_vars, double_optin: false, update_existing: true, send_welcome: true }, cb)
  })
}
