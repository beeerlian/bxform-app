import config from 'configs/config'
import httpStatus from 'http-status'
import fetch from 'node-fetch'
import ApiError from 'utils/api-error'
import { firebase } from 'utils/firebase/firebase'

const emailSignUp = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const emailSignIn = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const refreshTokens = async body => {
  const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${config.firebase.apiKey}`, {
    method: 'POST',
    body: JSON.stringify(body)
  })

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const getUserData = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const verifyEmail = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const confirmEmail = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const sendPasswordReset = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const verifyPasswordReset = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const confirmPasswordReset = async body => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${config.firebase.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )

  if (response.status === 200) {
    const data = await response.json()

    return data
  }

  throw new ApiError(response.status, response.statusText)
}

const conditionalLogin = async email => {
  const firebaseBody = {
    email,
    password: 'DefaultPassword321',
    returnSecureToken: true
  }

  let fireAuthUser

  await firebase
    .auth()
    .getUserByEmail(email)
    .then(res => {
      fireAuthUser = res
    })
    .catch(e => {
      throw new ApiError(httpStatus.BAD_REQUEST, e)
    })

  if (!fireAuthUser) {
    const createdUser = await emailSignUp(firebaseBody)

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    fireAuthUser = createdUser
  } else {
    const signInUser = await emailSignIn(firebaseBody)

    if (!signInUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    fireAuthUser = signInUser
  }

  return fireAuthUser
}

export const FirebaseService = {
  emailSignUp,
  emailSignIn,
  refreshTokens,
  getUserData,
  verifyEmail,
  confirmEmail,
  sendPasswordReset,
  verifyPasswordReset,
  confirmPasswordReset,
  conditionalLogin
}
