import { z } from 'zod'

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`)

export const checkoutSchema = z.object({
  name: requiredText('Full name'),
  email: z.email('Enter a valid email address'),
  address: requiredText('Street address'),
  city: requiredText('City'),
  postalCode: requiredText('Postal code'),
})

export type CheckoutDetails = z.infer<typeof checkoutSchema>
