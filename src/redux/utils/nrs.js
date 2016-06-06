const EPOCH_BEGINNING = 1385294400000
const BIG_NXT = new BigInteger(String(1e8))

export function convertToNQT (amount) {
  const bigAmount = new BigInteger(String(amount))

  return bigAmount.multiply(BIG_NXT).toString()
}

export function convertToNXT (amountNQT) {
  const bigAmount = new BigInteger(String(amountNQT))

  return bigAmount.divide(BIG_NXT).toString()
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp * 1000 + EPOCH_BEGINNING - 500)
  return date
}
