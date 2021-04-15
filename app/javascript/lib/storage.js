const tryLocalStorage = () => (
  new Promise((resolve, reject) => {
    try {
      resolve(window.localStorage)
    } catch (err) {
      if (err.code === 18 || /security/i.test(err.name)) {
        reject('Local storage is not available')
      } else {
        throw err
      }
    }
  })
)

const getItem = key => (
  tryLocalStorage().then(localStorage =>
    localStorage.getItem(key)
  )
)

const setItem = (key, value, clearOnException = true) => (
  tryLocalStorage().then(localStorage =>
    new Promise((resolve, reject) => {
      try {
        resolve(localStorage.setItem(key, value))
      } catch (err) {
        console.log(err)
        if (err.code === 22 || /quota/i.test(err.name)) {
          if (clearOnException) {
            localStorage.clear()
            setItem(key, value, false)
          } else {
            reject('Local storage quota exceeded')
          }
        } else {
          throw err
        }
      }
    })
  )
)

export default { getItem, setItem }
