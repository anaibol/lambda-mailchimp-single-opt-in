# Mailchimp single opt-in Amazon Lambda function
A Lambda function for creating MailChimp subscriptions with single opt-in.

Authentication

Set your API key and list ID in the .env file. Copy the sample to get started:

$ cp .env.sample .env
Additional details about authenticating with the MailChimp API is available here.

Deployment

There's a handy script included to create your zip archive:

```
$ npm start
```

Build (Babel -> ES5)

```
$ npm run build
```

Deploy

```
$ npm run deploy
```

```
$ curl -X POST -H "Content-Type: application/json" \
-d '{ "email": "name@email.com" }' \
YOUR_API_GATEWAY_URL
```
