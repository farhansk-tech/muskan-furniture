import { supabase, isSupabaseConfigured } from './supabase'
import { CATEGORIES } from '../data/categories'

export const REFERENCE_BUCKET = 'reference-designs'
export const ENQUIRY_TABLE = 'custom_enquiries'

const toNumber = (value) => (value === '' || value === undefined ? null : Number(value))
const toText = (value) => (value && value.trim() ? value.trim() : null)

function makeReference() {
  const d = new Date()
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `MF-${stamp}-${random}`
}

// Saves an enquiry (and optional reference photo) to Supabase.
// Returns { reference } on success, throws on failure.
export async function submitCustomEnquiry(values, imageFile) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('SUPABASE_NOT_CONFIGURED')
  }

  const reference = makeReference()
  let referenceImagePath = null

  if (imageFile) {
    const ext = (imageFile.name.split('.').pop() || 'jpg').toLowerCase()
    const path = `${reference}/${crypto.randomUUID()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from(REFERENCE_BUCKET)
      .upload(path, imageFile, { contentType: imageFile.type, upsert: false })
    if (uploadError) throw uploadError
    referenceImagePath = path
  }

  const row = {
    reference,
    customer_name: values.customerName.trim(),
    mobile: values.mobile.replace(/[\s-]/g, ''),
    furniture_category: CATEGORIES.find((c) => c.slug === values.category)?.name ?? values.category,
    preferred_design: toText(values.preferredDesign),
    wood_type: toText(values.woodType),
    length_cm: toNumber(values.length),
    width_cm: toNumber(values.width),
    height_cm: toNumber(values.height),
    preferred_colour: toText(values.colour),
    finishing_type: toText(values.finishing),
    estimated_budget: toNumber(values.budget),
    delivery_village: values.deliveryVillage.trim(),
    additional_requirements: toText(values.requirements),
    reference_image_path: referenceImagePath,
    status: 'New Enquiry',
  }

  const { error } = await supabase.from(ENQUIRY_TABLE).insert(row)

  if (error) {
    // Avoid leaving an orphaned photo behind if the enquiry row failed.
    if (referenceImagePath) {
      await supabase.storage.from(REFERENCE_BUCKET).remove([referenceImagePath])
    }
    throw error
  }

  return { reference }
}
