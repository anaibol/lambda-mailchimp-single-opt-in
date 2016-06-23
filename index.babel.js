import { MailChimpAPI } from 'mailchimp'
import mailChecker from 'mailchecker'
import { verify } from 'email-verify'

const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } = process.env

const api = new MailChimpAPI(MAILCHIMP_API_KEY, { version: '2.0' })

export function handler({ email, first_name }, context, cb) {
  if (!email) return cb(new Error('mail is empty'))

  if (!mailChecker.isValid(email)) {
    return cb(new Error('mail is invalid'))
  }

  cb(null, {})

  verify(email, (err, info) => {
    if (err) {
      return cb(err)
    }

    const merge_vars = {
      FNAME: first_name
    }

    api.call('lists', 'subscribe', { id: LIST_ID, email: { email }, merge_vars, double_optin: false, update_existing: true }, function(err, res) {
    })
  })
}
