import { TokenMessage } from 'node_modules/firebase-admin/lib/messaging/messaging-api'
import Notification from 'notification/notification.model'
import { firebase } from 'utils/firebase/firebase'

export const testSendNotification = async fcmToken => {
  const message: TokenMessage = {
    token: fcmToken,
    data: {
      title: 'FCM Message',
      body: 'This is an FCM notification message!'
    },
    // Set Android priority to "high"
    android: {
      priority: 'high',
      notification: {
        icon: 'notif_icon',
        color: '#00FFA3'
        // imageUrl: 'https://cdn-infokab.s3.ap-southeast-3.amazonaws.com/logo/Group+18899.png'
      }
    },
    // Add APNS (Apple) config
    apns: {
      payload: {
        aps: {
          contentAvailable: true,
          'mutable-content': 1
        }
      },
      headers: {
        'apns-push-type': 'background',
        'apns-priority': '5', // Must be `5` when `contentAvailable` is set to true.
        'apns-topic': 'io.flutter.plugins.firebase.messaging' // bundle identifier
      },
      fcmOptions: {
        // imageUrl: 'https://cdn-infokab.s3.ap-southeast-3.amazonaws.com/logo/Group+18899.png'
      }
    },
    webpush: {
      headers: {
        // image: 'https://cdn-infokab.s3.ap-southeast-3.amazonaws.com/logo/Group+18899.png'
      }
    },
    notification: {
      title: 'FCM Message',
      body: 'This is an FCM notification message!'
    }
  }

  return await firebase.messaging().send(message)
}

const sendNotificationToDevice = async ({ fcmToken, data, title, body }) => {
  if (!data && !fcmToken) {
    return
  }

  const message: TokenMessage = {
    token: fcmToken,
    data: {
      title: title,
      body: body,
      ...data
    },

    // Set Android priority to "high"
    android: {
      priority: 'high',
      notification: {
        icon: 'notif_icon',
        color: '#00FFA3'
        // imageUrl: 'https://cdn-infokab.s3.ap-southeast-3.amazonaws.com/logo/Group+18899.png'
      }
    },

    // Add APNS (Apple) config
    apns: {
      payload: {
        aps: {
          contentAvailable: false
        }
      },
      headers: {
        // 'apns-push-type': 'background',
        'apns-priority': '10' // Must be `5` when `contentAvailable` is set to true.
        // 'apns-topic': 'io.flutter.plugins.firebase.messaging' // bundle identifier
      },
      fcmOptions: {
        // imageUrl: 'https://cdn-infokab.s3.ap-southeast-3.amazonaws.com/logo/Group+18899.png'
      }
    },

    notification: {
      title: title,
      body: body
    }
  }

  firebase
    .messaging()
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response)
    })
    .catch(error => {
      console.log('Error sending message:', error)
    })
}

export const sendNotificationAndSave = async ({ fcmToken, data, title, body, userId, type }) => {
  if (!data && !fcmToken) {
    return
  }

  sendNotificationToDevice({
    fcmToken,
    data,
    title,
    body
  })

  return await Notification.create({
    title,
    body,
    data,
    user: userId,
    type
  })
}
