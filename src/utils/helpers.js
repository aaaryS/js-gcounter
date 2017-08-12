export const generateRandomId = (max, current, min = 0) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  return (num === current) ? generateRandomId(max, current) : num
}

export const generateRandomTime = (min, max) => (Math.floor(Math.random() * max * 1000) + min * 1000)
