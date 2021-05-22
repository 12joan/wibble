let buffer = ''

const performDiceRoll = (notation, performRoll) => (
  performRoll({
    name: null,
    notation,
  })
)

const evaluateBuffer = eventDelegate => {
  const bufferActions = {
    '2': () => performDiceRoll('1d20', eventDelegate.performRoll),
    '4': () => performDiceRoll('1d4', eventDelegate.performRoll),
    '6': () => performDiceRoll('1d6', eventDelegate.performRoll),
    '8': () => performDiceRoll('1d8', eventDelegate.performRoll),
    '0': () => performDiceRoll('1d10', eventDelegate.performRoll),
    '12': () => performDiceRoll('1d12', eventDelegate.performRoll),
    '100': () => performDiceRoll('1d100', eventDelegate.performRoll),
    'a': () => performDiceRoll('1d20 (adv)', eventDelegate.performRoll),
    'd': () => performDiceRoll('1d20 (dis)', eventDelegate.performRoll),
    'c': () => eventDelegate.showRollModal(),
    'p': () => eventDelegate.showPreferencesModal(),
    '/': event => {
      event.preventDefault()

      const input = document.querySelector('#notation-input')
      input.focus()
      input.select()
    },
  }

  let possibleCompletions = false

  for (let pattern of Object.keys(bufferActions)) {
    // Test if the buffer matches the beginning of the pattern
    if (RegExp('^' + buffer + '.*').test(pattern)) {
      possibleCompletions = true
    }

    // Test if the buffer matches the full pattern
    if (RegExp('^' + pattern + '$').test(buffer)) {
      return { match: 'full', action: bufferActions[pattern] }
    }
  }

  if (possibleCompletions) {
    return { match: 'partial' }
  } else {
    return { match: 'none' }
  }
}

const handleBufferChanged = (event, eventDelegate, recursive = true) => {
  const { match, ...matchData } = evaluateBuffer(eventDelegate)

  switch (match) {
    case 'full':
      matchData.action(event)
      buffer = ''
      break

    case 'partial':
      // No action
      break

    case 'none':
      buffer = event.key

      if (recursive) {
        handleBufferChanged(event, eventDelegate, false)
      }

      break
  }
}

const bindHotkeys = (element, eventDelegate) => (
  element.addEventListener('keydown', event => {
    const { key, target } = event

    if (target.matches('input, select')) {
      return
    }

    if (key === 'Escape') {
      buffer = ''
      return
    }

    buffer += key

    handleBufferChanged(event, eventDelegate)
  })
)

export { bindHotkeys }
