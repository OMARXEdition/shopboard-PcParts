import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutForm } from '../src/modules/checkout/CheckoutForm'
import { checkoutSchema } from '../src/modules/checkout/checkout.schema'

it('rejects blank contact and address details before demo confirmation', async () => {
  const user = userEvent.setup()
  render(<CheckoutForm />)

  await user.click(
    screen.getByRole('button', { name: /complete demo checkout/i }),
  )

  expect(screen.getByLabelText('Full name')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  expect(screen.getByLabelText('Email address')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  expect(screen.getByLabelText('Street address')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  expect(screen.getByLabelText('City')).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByLabelText('Postal code')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

it('rejects malformed email and whitespace-only fields', () => {
  const result = checkoutSchema.safeParse({
    name: '   ',
    email: 'invalid-email',
    address: '   ',
    city: '   ',
    postalCode: '   ',
  })
  expect(result.success).toBe(false)
})

it('accepts valid details and clearly confirms a demo checkout', async () => {
  const user = userEvent.setup()
  render(<CheckoutForm />)

  await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace')
  await user.type(screen.getByLabelText('Email address'), 'ada@example.com')
  await user.type(screen.getByLabelText('Street address'), '12 Computer Lane')
  await user.type(screen.getByLabelText('City'), 'London')
  await user.type(screen.getByLabelText('Postal code'), 'SW1A 1AA')
  await user.click(
    screen.getByRole('button', { name: /complete demo checkout/i }),
  )

  expect(await screen.findByRole('status')).toHaveTextContent(
    /demo checkout complete/i,
  )
  expect(screen.getByRole('status')).toHaveTextContent(/no order was placed/i)
})
