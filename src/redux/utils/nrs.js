const EPOCH_BEGINNING = 1385294400000
const BIG_NXT = new BigInteger(String(1e8))

export function convertToNQT (amount) {
  amount = String(amount)
  const parts = amount.split('.')
  const bigAmount = new BigInteger(amount).multiply(BIG_NXT)
  let divide = new BigInteger('1')
  if (parts[1]) {
    divide = new BigInteger(String(Math.pow(10, parts[1].length)))
  }

  return bigAmount.divide(divide).toString()
}

export function convertToNXT (amountNQT) {
  const bigAmount = new BigInteger(String(amountNQT))

  return bigAmount.divide(BIG_NXT).toString()
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp * 1000 + EPOCH_BEGINNING - 500)
  return date
}
