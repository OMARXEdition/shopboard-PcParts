import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { checkoutSchema, type CheckoutDetails } from './checkout.schema'

export function CheckoutForm() {
  const [complete, setComplete] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutDetails>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
    },
  })

  if (complete) {
    return (
      <div role="status" className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Demo checkout complete</h2>
        <p>No order was placed or payment collected.</p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => setComplete(true))}
      className="max-w-xl space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold">Checkout details</h2>
        <p>This is a demo checkout. No order or payment will be submitted.</p>
      </div>
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="checkout-name">Full name</FieldLabel>
          <Input
            id="checkout-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'checkout-name-error' : undefined}
            {...register('name')}
          />
          <FieldError id="checkout-name-error" errors={[errors.name]} />
        </Field>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="checkout-email">Email address</FieldLabel>
          <Input
            id="checkout-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'checkout-email-error' : undefined}
            {...register('email')}
          />
          <FieldError id="checkout-email-error" errors={[errors.email]} />
        </Field>
        <Field data-invalid={Boolean(errors.address)}>
          <FieldLabel htmlFor="checkout-address">Street address</FieldLabel>
          <Input
            id="checkout-address"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={
              errors.address ? 'checkout-address-error' : undefined
            }
            {...register('address')}
          />
          <FieldError id="checkout-address-error" errors={[errors.address]} />
        </Field>
        <Field data-invalid={Boolean(errors.city)}>
          <FieldLabel htmlFor="checkout-city">City</FieldLabel>
          <Input
            id="checkout-city"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'checkout-city-error' : undefined}
            {...register('city')}
          />
          <FieldError id="checkout-city-error" errors={[errors.city]} />
        </Field>
        <Field data-invalid={Boolean(errors.postalCode)}>
          <FieldLabel htmlFor="checkout-postal-code">Postal code</FieldLabel>
          <Input
            id="checkout-postal-code"
            autoComplete="postal-code"
            aria-invalid={Boolean(errors.postalCode)}
            aria-describedby={
              errors.postalCode ? 'checkout-postal-code-error' : undefined
            }
            {...register('postalCode')}
          />
          <FieldError
            id="checkout-postal-code-error"
            errors={[errors.postalCode]}
          />
        </Field>
      </FieldGroup>
      <Button type="submit">Complete demo checkout</Button>
    </form>
  )
}
