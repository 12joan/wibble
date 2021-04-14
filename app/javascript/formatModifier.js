const formatModifier = value => {
  const sign = value >= 0 ? '+ ' : '- '
  return sign + Math.abs(value)
}

export default formatModifier
