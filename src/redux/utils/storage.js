export function storeSecretPhrase (username, passphrase) {
  if (localStorage.getItem(`${username}_passphrase`)) {
    return false
  }

  if (typeof passphrase === 'object') {
    passphrase = JSON.stringify(passphrase)
  }

  localStorage.setItem(`${username}_passphrase`, passphrase)
  return true
}

export function getSecretPhrase (username) {
  const passphrase = localStorage.getItem(`${username}_passphrase`)

  if (!passphrase) {
    return null
  }

  return JSON.parse(passphrase)
}
