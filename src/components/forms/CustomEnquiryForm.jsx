import { useState } from 'react'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import { FINISHING_TYPES, WOOD_TYPES } from '../../data/formOptions'
import { isSupabaseConfigured } from '../../lib/supabase'
import { submitCustomEnquiry } from '../../lib/enquiries'
import { validateEnquiry } from '../../lib/validateEnquiry'
import { whatsappLink } from '../../data/site'
import Button from '../ui/Button'
import FormField, { inputClass } from './FormField'
import ImageUploadField from './ImageUploadField'

const EMPTY = {
  customerName: '',
  mobile: '',
  deliveryVillage: '',
  category: '',
  preferredDesign: '',
  woodType: '',
  colour: '',
  finishing: '',
  length: '',
  width: '',
  height: '',
  budget: '',
  requirements: '',
  website: '', // honeypot, hidden from people, filled only by bots
}

export default function CustomEnquiryForm({ initialCategory = '' }) {
  const [values, setValues] = useState({ ...EMPTY, category: initialCategory })
  const [imageFile, setImageFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [result, setResult] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const update = (key) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const setImageError = (message) => setErrors((err) => ({ ...err, image: message }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (values.website) return

    const found = validateEnquiry(values)
    if (errors.image) found.image = errors.image
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setSubmitError('')
      return
    }

    setStatus('submitting')
    setSubmitError('')
    try {
      const response = await submitCustomEnquiry(values, imageFile)
      setResult(response)
      setStatus('success')
    } catch (err) {
      console.error('Enquiry submission failed:', err)
      setSubmitError(
        isSupabaseConfigured
          ? 'We could not send your enquiry. Please check your connection and try again, or contact us on WhatsApp.'
          : 'Online enquiries are not connected yet. Please contact us on WhatsApp.'
      )
      setStatus('error')
    }
  }

  function reset() {
    setValues({ ...EMPTY, category: initialCategory })
    setImageFile(null)
    setErrors({})
    setResult(null)
    setStatus('idle')
    setSubmitError('')
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-14">
        <CheckCircle2 className="mx-auto h-14 w-14 text-walnut" strokeWidth={1.25} />
        <h2 className="mt-6 font-serif text-4xl text-walnut">Thank you, {values.customerName.trim().split(' ')[0]}.</h2>
        <p className="mx-auto mt-4 max-w-md text-chocolate/75">
          Your custom furniture enquiry has been received. Our team will review it and prepare a quotation for your approval.
        </p>
        <p className="mt-8 text-sm text-chocolate/60">Your reference number</p>
        <p className="mt-1 break-all font-mono text-lg tracking-wider text-walnut">{result.reference}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            href={whatsappLink(`Hello, my custom furniture enquiry reference is ${result.reference}.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Share on WhatsApp
          </Button>
          <Button variant="outline" className="text-walnut" onClick={reset}>
            Submit another enquiry
          </Button>
        </div>
      </div>
    )
  }

  const selectClass = inputClass

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12 rounded-3xl bg-white p-6 shadow-sm sm:p-10 lg:p-12">
      <fieldset className="space-y-6">
        <legend className="legend mb-6">About you</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Customer name" htmlFor="customerName" required error={errors.customerName}>
            <input
              id="customerName"
              name="name"
              autoComplete="name"
              value={values.customerName}
              onChange={update('customerName')}
              aria-invalid={!!errors.customerName}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Mobile number"
            htmlFor="mobile"
            required
            error={errors.mobile}
            hint="We will contact you on this number."
          >
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10-digit mobile number"
              value={values.mobile}
              onChange={update('mobile')}
              aria-invalid={!!errors.mobile}
              className={inputClass}
            />
          </FormField>
          <FormField label="Delivery village" htmlFor="deliveryVillage" required error={errors.deliveryVillage} className="sm:col-span-2">
            <input
              id="deliveryVillage"
              name="village"
              autoComplete="address-level2"
              value={values.deliveryVillage}
              onChange={update('deliveryVillage')}
              aria-invalid={!!errors.deliveryVillage}
              className={inputClass}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="legend mb-6">Your furniture</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Furniture category" htmlFor="category" required error={errors.category}>
            <select id="category" value={values.category} onChange={update('category')} aria-invalid={!!errors.category} className={selectClass}>
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Preferred design" htmlFor="preferredDesign" hint="Name a design from our collection, or describe your idea.">
            <input id="preferredDesign" value={values.preferredDesign} onChange={update('preferredDesign')} className={inputClass} />
          </FormField>
          <FormField label="Wood type" htmlFor="woodType">
            <select id="woodType" value={values.woodType} onChange={update('woodType')} className={selectClass}>
              <option value="">Select a wood type</option>
              {WOOD_TYPES.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Preferred colour" htmlFor="colour">
            <input id="colour" value={values.colour} onChange={update('colour')} placeholder="e.g. Dark walnut" className={inputClass} />
          </FormField>
          <FormField label="Finishing type" htmlFor="finishing">
            <select id="finishing" value={values.finishing} onChange={update('finishing')} className={selectClass}>
              <option value="">Select a finish</option>
              {FINISHING_TYPES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="legend mb-6">Dimensions (cm)</legend>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            ['length', 'Length'],
            ['width', 'Width'],
            ['height', 'Height'],
          ].map(([key, label]) => (
            <FormField key={key} label={label} htmlFor={key} error={errors[key]} hint="Optional">
              <input
                id={key}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={values[key]}
                onChange={update(key)}
                aria-invalid={!!errors[key]}
                className={inputClass}
              />
            </FormField>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="legend mb-6">Budget and details</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Estimated budget (₹)" htmlFor="budget" error={errors.budget} hint="Optional. Helps us suggest suitable options.">
            <input
              id="budget"
              type="number"
              inputMode="numeric"
              min="0"
              step="500"
              value={values.budget}
              onChange={update('budget')}
              aria-invalid={!!errors.budget}
              className={inputClass}
            />
          </FormField>
          <FormField label="Reference design photo" htmlFor="referenceImage" error={errors.image} hint="Optional. A photo or sketch helps us understand your idea.">
            <ImageUploadField
              file={imageFile}
              onChange={setImageFile}
              onError={setImageError}
            />
          </FormField>
        </div>
        <FormField label="Additional requirements" htmlFor="requirements" error={errors.requirements}>
          <textarea
            id="requirements"
            rows={5}
            value={values.requirements}
            onChange={update('requirements')}
            placeholder="Anything else we should know: drawers, height limits, colour matching, delivery timing."
            className={`${inputClass} min-h-[130px] resize-y`}
          />
        </FormField>
      </fieldset>

      {/* Honeypot: hidden from people, bots tend to fill it in. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
        </label>
      </div>

      {submitError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-beige/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-chocolate/55">Fields marked * are required.</p>
        <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? 'Sending your request…' : 'Submit Custom Furniture Request'}
        </Button>
      </div>
    </form>
  )
}
