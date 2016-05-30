const bigNXT = new BigInteger(String(1e8))

export function convertToNXT (amountNQT) {
  const bigAmount = new BigInteger(String(amountNQT))

  return bigAmount.divide(bigNXT).toString()
}
