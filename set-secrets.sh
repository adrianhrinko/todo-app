#!/bin/bash

# Parse command line arguments
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Error: Backend ID and environment file are required"
    echo "Usage: $0 <backend-id> <env-file>"
    echo "Example: $0 my-backend-id .env.local"
    exit 1
fi

BACKEND_ID="$1"
ENV_FILE="$2"

# Verify env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: Environment file '$ENV_FILE' not found"
    exit 1
fi

# Source the environment file
source "$ENV_FILE"

# Firebase config secrets
echo $NEXT_PUBLIC_FIREBASE_API_KEY | firebase apphosting:secrets:set --force --data-file - firebaseApiKey
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseApiKey

echo $NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | firebase apphosting:secrets:set --force --data-file - firebaseAuthDomain
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseAuthDomain

echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID | firebase apphosting:secrets:set --force --data-file - firebaseProjectId
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseProjectId

echo $NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | firebase apphosting:secrets:set --force --data-file - firebaseStorageBucket
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseStorageBucket

echo $NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | firebase apphosting:secrets:set --force --data-file - firebaseMessagingSenderId
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseMessagingSenderId

echo $NEXT_PUBLIC_FIREBASE_APP_ID | firebase apphosting:secrets:set --force --data-file - firebaseAppId
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseAppId

echo $NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID | firebase apphosting:secrets:set --force --data-file - firebaseMeasurementId
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseMeasurementId

# Firebase Admin secrets
echo "$FIREBASE_CLIENT_EMAIL" | firebase apphosting:secrets:set --force --data-file - firebaseClientEmail
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebaseClientEmail

echo "$FIREBASE_PRIVATE_KEY" | firebase apphosting:secrets:set --force --data-file - firebasePrivateKey
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID firebasePrivateKey

# Stripe secrets
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | firebase apphosting:secrets:set --force --data-file - stripePublishableKey
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID stripePublishableKey

echo $STRIPE_SECRET_KEY | firebase apphosting:secrets:set --force --data-file - stripeSecretKey
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID stripeSecretKey

# Mixpanel secret
echo $NEXT_PUBLIC_MIXPANEL_TOKEN | firebase apphosting:secrets:set --force --data-file - mixpanelToken
firebase apphosting:secrets:grantaccess --backend $BACKEND_ID mixpanelToken
