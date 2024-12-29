#!/bin/bash

# Source the environment file
source .env.local

# Firebase config secrets
echo $NEXT_PUBLIC_FIREBASE_API_KEY | firebase apphosting:secrets:set --force --data-file - firebaseApiKey
echo $NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | firebase apphosting:secrets:set --force --data-file - firebaseAuthDomain
echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID | firebase apphosting:secrets:set --force --data-file - firebaseProjectId
echo $NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | firebase apphosting:secrets:set --force --data-file - firebaseStorageBucket
echo $NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | firebase apphosting:secrets:set --force --data-file - firebaseMessagingSenderId
echo $NEXT_PUBLIC_FIREBASE_APP_ID | firebase apphosting:secrets:set --force --data-file - firebaseAppId
echo $NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID | firebase apphosting:secrets:set --force --data-file - firebaseMeasurementId

# Firebase Admin secrets
echo "$FIREBASE_CLIENT_EMAIL" | firebase apphosting:secrets:set --force --data-file - firebaseClientEmail
echo "$FIREBASE_PRIVATE_KEY" | firebase apphosting:secrets:set --force --data-file - firebasePrivateKey

# Stripe secrets
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | firebase apphosting:secrets:set --force --data-file - stripePublishableKey
echo $STRIPE_SECRET_KEY | firebase apphosting:secrets:set --force --data-file - stripeSecretKey

# Mixpanel secret
echo $NEXT_PUBLIC_MIXPANEL_TOKEN | firebase apphosting:secrets:set --force --data-file - mixpanelToken