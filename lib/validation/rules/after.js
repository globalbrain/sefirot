import { helpers } from 'vuelidate/lib/validators'

function hasBothYearAndMonth (value) {
  if (!value) {
    return false
  }

  if (!value.year || !value.month) {
    return false
  }

  return true
}

export default function after (locator, msg) {
  return helpers.withParams({ type: 'after', msg }, (value, parentVm) => {
    if (!value) {
      return true
    }

    const base = helpers.ref(locator, this, parentVm)

    if (!hasBothYearAndMonth(base) || !hasBothYearAndMonth(value)) {
      return true
    }

    const mergedBase = base.year + base.month
    const mergedValue = value.year + value.month

    if (mergedBase >= mergedValue) {
      return false
    }

    return true
  })
}
