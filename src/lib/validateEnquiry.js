// Returns an object of field-name -> message. An empty object means the form is valid.
export function validateEnquiry(values) {
  const errors = {}

  if (values.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name.'
  }

  const mobile = values.mobile.replace(/[\s-]/g, '')
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    errors.mobile = 'Enter a valid 10-digit mobile number.'
  }

  if (!values.category) {
    errors.category = 'Please choose a furniture category.'
  }

  if (values.deliveryVillage.trim().length < 2) {
    errors.deliveryVillage = 'Please enter your delivery village.'
  }

  for (const key of ['length', 'width', 'height']) {
    if (values[key] !== '' && !(Number(values[key]) > 0)) {
      errors[key] = 'Enter a number greater than 0.'
    }
  }

  if (values.budget !== '' && !(Number(values.budget) >= 0)) {
    errors.budget = 'Enter a valid amount.'
  }

  if (values.requirements.length > 2000) {
    errors.requirements = 'Please keep this under 2,000 characters.'
  }

  return errors
}
