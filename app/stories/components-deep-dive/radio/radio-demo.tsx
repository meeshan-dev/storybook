import { IconCheck, IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react';
import { cn } from '~/lib/utils';
import { Radio, RadioGroupRoot, RadioIcon } from './radio';

export function RadioDemo() {
  return (
    <section data-demo className='flex grow flex-col gap-12'>
      {/* Pricing Plans */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Choose Your Plan</h3>
          <p className='text-muted-foreground text-sm'>
            Select a subscription plan that works best for you
          </p>
        </div>
        <PricingPlans />
      </section>

      {/* Shipping Options */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Shipping Method</h3>
          <p className='text-muted-foreground text-sm'>
            Choose how you want your order delivered
          </p>
        </div>
        <ShippingOptions />
      </section>

      {/* Theme Selector */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Appearance</h3>
          <p className='text-muted-foreground text-sm'>
            Select your preferred color theme
          </p>
        </div>
        <ThemeSelector />
      </section>

      {/* Payment Method */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Payment Method</h3>
          <p className='text-muted-foreground text-sm'>
            Select your preferred payment option
          </p>
        </div>
        <PaymentMethod />
      </section>
    </section>
  );
}

/* ---------------------------------- */
/* 1. Pricing Plans                    */
/* ---------------------------------- */

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for side projects',
    features: ['5 projects', '10GB storage', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Best for growing teams',
    features: ['Unlimited projects', '100GB storage', 'Priority support'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For large organizations',
    features: ['Custom solutions', 'Unlimited storage', 'Dedicated support'],
  },
];

function PricingPlans() {
  return (
    <RadioGroupRoot name='pricing' defaultValue='pro'>
      <div className='grid gap-4 sm:grid-cols-3'>
        {pricingPlans.map((plan) => (
          <label
            key={plan.id}
            className='group bg-card hover:border-foreground/20 relative flex cursor-pointer flex-col rounded-xl border p-5 transition-all select-none has-[input:checked]:border-emerald-600/50 has-[input:checked]:has-[input:checked]:border-emerald-600 has-[input:checked]:bg-emerald-600/5 has-[input:checked]:ring-[3px] has-[input:checked]:has-[input:checked]:ring-emerald-600/50 dark:has-[input:checked]:border-emerald-400/50 dark:has-[input:checked]:has-[input:checked]:border-emerald-400 dark:has-[input:checked]:bg-emerald-400/5 dark:has-[input:checked]:has-[input:checked]:ring-emerald-400/50'
          >
            {plan.popular && (
              <span className='absolute -top-2.5 right-4 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-emerald-500'>
                Popular
              </span>
            )}

            <div className='mb-4 flex items-start justify-between'>
              <div>
                <h4 className='font-semibold'>{plan.name}</h4>
                <p className='text-muted-foreground text-sm'>
                  {plan.description}
                </p>
              </div>
              <PlanIndicator>
                <Radio value={plan.id}>
                  <RadioIcon type='check'>
                    <IconCheck className='size-3.5 text-emerald-600 dark:text-emerald-400' />
                  </RadioIcon>
                </Radio>
              </PlanIndicator>
            </div>

            <div className='mb-4'>
              <span className='text-3xl font-bold'>{plan.price}</span>
              <span className='text-muted-foreground'>{plan.period}</span>
            </div>

            <ul className='space-y-2'>
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className='text-muted-foreground flex items-center gap-2 text-sm'
                >
                  <IconCheck className='size-4 text-emerald-600 dark:text-emerald-400' />
                  {feature}
                </li>
              ))}
            </ul>
          </label>
        ))}
      </div>
    </RadioGroupRoot>
  );
}

/* ---------------------------------- */
/* 2. Shipping Options                 */
/* ---------------------------------- */

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 'Free',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: '$9.99',
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    description: 'Next business day',
    price: '$24.99',
  },
  {
    id: 'pickup',
    name: 'Store Pickup',
    description: 'Ready in 2 hours',
    price: 'Free',
    disabled: true,
  },
];

function ShippingOptions() {
  return (
    <RadioGroupRoot name='shipping' defaultValue='standard'>
      <div className='space-y-3'>
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className='group bg-card hover:border-foreground/20 flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all outline-none select-none has-[input:checked]:border-blue-600/50 has-[input:checked]:has-[input:checked]:border-blue-600 has-[input:checked]:bg-blue-600/5 has-[input:checked]:ring-[3px] has-[input:checked]:has-[input:checked]:ring-blue-600/50 has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50 dark:has-[input:checked]:border-blue-400/50 has-[input:checked]:dark:has-[input:checked]:border-blue-400 dark:has-[input:checked]:bg-blue-400/5 has-[input:checked]:dark:has-[input:checked]:ring-blue-400/50'
          >
            <ShippingIndicator color='blue'>
              <Radio value={option.id} disabled={option.disabled}>
                <RadioIcon type='box'>
                  <div className='size-2 rounded-full' />
                </RadioIcon>
                <RadioIcon type='check'>
                  <div className='size-2 rounded-full bg-blue-600 dark:bg-blue-400' />
                </RadioIcon>
              </Radio>
            </ShippingIndicator>

            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{option.name}</span>
                {option.disabled && (
                  <span className='rounded bg-amber-500/10 px-1.5 py-0.5 text-xs text-amber-600 dark:text-amber-400'>
                    Unavailable
                  </span>
                )}
              </div>
              <span className='text-muted-foreground text-sm'>
                {option.description}
              </span>
            </div>

            <span className='font-semibold'>{option.price}</span>
          </label>
        ))}
      </div>
    </RadioGroupRoot>
  );
}

/* ---------------------------------- */
/* 3. Theme Selector                   */
/* ---------------------------------- */

const themes = [
  { id: 'light', name: 'Light', icon: IconSun },
  { id: 'dark', name: 'Dark', icon: IconMoon },
  { id: 'system', name: 'System', icon: IconSunMoon },
];

function ThemeSelector() {
  return (
    <RadioGroupRoot name='theme' defaultValue='system'>
      <div className='flex gap-3'>
        {themes.map((theme) => (
          <label
            key={theme.id}
            className='group bg-card hover:border-foreground/20 flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl border p-2 transition-all outline-none select-none has-[input:checked]:border-purple-600/50 has-[input:checked]:has-[input:checked]:border-purple-600 has-[input:checked]:bg-purple-600/5 has-[input:checked]:ring-[3px] has-[input:checked]:has-[input:checked]:ring-purple-600/50 dark:has-[input:checked]:border-purple-400/50 has-[input:checked]:dark:has-[input:checked]:border-purple-400 dark:has-[input:checked]:bg-purple-400/5 has-[input:checked]:dark:has-[input:checked]:ring-purple-400/50'
          >
            <div className='bg-muted/50 flex size-12 items-center justify-center rounded-full transition-colors group-has-[input:checked]:bg-purple-600/10 dark:group-has-[input:checked]:bg-purple-400/10'>
              <theme.icon className='text-muted-foreground size-6 transition-colors group-has-[input:checked]:text-purple-600 dark:group-has-[input:checked]:text-purple-400' />
            </div>

            <span className='text-sm font-medium'>{theme.name}</span>

            <ThemeIndicator color='purple'>
              <Radio value={theme.id}>
                <RadioIcon type='box'>
                  <div className='size-2 rounded-full' />
                </RadioIcon>
                <RadioIcon type='check'>
                  <div className='size-2 rounded-full bg-purple-600 dark:bg-purple-400' />
                </RadioIcon>
              </Radio>
            </ThemeIndicator>
          </label>
        ))}
      </div>
    </RadioGroupRoot>
  );
}

/* ---------------------------------- */
/* 4. Payment Method                   */
/* ---------------------------------- */

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    description: 'Pay with Visa, Mastercard, etc.',
  },
  { id: 'paypal', name: 'PayPal', description: 'Quick and secure payment' },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'Bitcoin, Ethereum accepted',
  },
];

function PaymentMethod() {
  return (
    <RadioGroupRoot name='payment' defaultValue='card'>
      <div className='space-y-2'>
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className='group bg-card hover:border-foreground/20 flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all outline-none select-none has-[input:checked]:border-emerald-600/50 has-[input:checked]:bg-emerald-600/5 has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:has-[input:checked]:border-emerald-600 has-[input:focus-visible]:has-[input:checked]:ring-emerald-600/50 dark:has-[input:checked]:border-emerald-600/50 dark:has-[input:checked]:bg-emerald-600/5 has-[input:focus-visible]:dark:has-[input:checked]:border-emerald-600 has-[input:focus-visible]:dark:has-[input:checked]:ring-emerald-600/50'
          >
            <ClassicRadioIndicator>
              <Radio value={method.id}>
                <RadioIcon type='box'>
                  <div className='size-2 rounded-full' />
                </RadioIcon>
                <RadioIcon type='check'>
                  <div className='size-2 rounded-full bg-emerald-600 dark:bg-emerald-400' />
                </RadioIcon>
              </Radio>
            </ClassicRadioIndicator>

            <div className='flex-1'>
              <span className='font-medium'>{method.name}</span>
              <p className='text-muted-foreground text-sm'>
                {method.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </RadioGroupRoot>
  );
}

/* ---------------------------------- */
/* Indicator Variants                  */
/* ---------------------------------- */

function PlanIndicator({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex size-5 items-center justify-center rounded-full border-2 transition-all',
        'border-foreground/20',
        'group-has-[input:checked]:border-emerald-600 group-has-[input:checked]:bg-emerald-600/10',
        'dark:group-has-[input:checked]:border-emerald-400 dark:group-has-[input:checked]:bg-emerald-400/10',
      )}
    >
      {children}
    </div>
  );
}

function ShippingIndicator({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'blue';
}) {
  return (
    <div
      className={cn(
        'flex size-5 items-center justify-center rounded-full border-2 transition-all',
        'border-foreground/20',
        color === 'blue' && [
          'group-has-[input:checked]:border-blue-600 group-has-[input:checked]:bg-blue-100',
          'dark:group-has-[input:checked]:border-blue-400 dark:group-has-[input:checked]:bg-blue-400/20',
        ],
      )}
    >
      {children}
    </div>
  );
}

function ThemeIndicator({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'purple';
}) {
  return (
    <div
      className={cn(
        'flex size-4 items-center justify-center rounded-full border-2 transition-all',
        'border-foreground/20',
        color === 'purple' && [
          'group-has-[input:checked]:border-purple-600 group-has-[input:checked]:bg-purple-100',
          'dark:group-has-[input:checked]:border-purple-400 dark:group-has-[input:checked]:bg-purple-400/20',
        ],
      )}
    >
      {children}
    </div>
  );
}

function ClassicRadioIndicator({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex size-5 items-center justify-center rounded-full border-2 transition-all',
        'border-foreground/20',
        'group-has-[input:checked]:border-emerald-600',
        'dark:group-has-[input:checked]:border-emerald-400',
      )}
    >
      {children}
    </div>
  );
}
