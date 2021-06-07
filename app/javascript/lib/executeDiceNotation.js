const executeDiceNotation = (inputValue, eventDelegate) => {
  const rolls = inputValue.split(/;/)

  const performRoll = rawNotation => {
    const nameRegex = /["'‘’‚‛“”„‟〝〞〟＂＇](.*)["'‘’‚‛“”„‟〝〞〟＂＇]/

    const [, name] = rawNotation.match(nameRegex) || ["no match", null]
    const notation = rawNotation.replace(nameRegex, "").trim()

    return eventDelegate.performRoll({
      name,
      notation,
    })
  }

  const performRolls = ([rawNotation, ...otherRolls]) => {
    performRoll(rawNotation)

    if (otherRolls.length > 0) {
      setTimeout(() => performRolls(otherRolls), 100)
    }

    return Promise.resolve()
  }

  return rolls.length > 1
    ? performRolls(rolls)
    : performRoll(rolls[0])
}

export default executeDiceNotation
