import {
  IconChevronDown,
  IconCreditCard,
  IconLock,
  IconPackage,
  IconPlus,
  IconSettings,
  IconShield,
  IconTruck,
  IconUser,
} from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from './accordion';

export function AccordionDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-12 py-10'>
      <FAQAccordion />
      <SettingsPanelAccordion />
      <ProductFeaturesAccordion />
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. FAQ Section — Real-world customer support pattern */
/* ———————————————————————————————————————————————————— */

const faqItems = [
  {
    id: 'shipping',
    icon: IconTruck,
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. International orders may take 10-14 business days depending on customs processing.',
  },
  {
    id: 'returns',
    icon: IconPackage,
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unused items in original packaging. Simply initiate a return through your account dashboard, print the prepaid label, and drop off at any authorized location.',
  },
  {
    id: 'payment',
    icon: IconCreditCard,
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for orders over $500.',
  },
  {
    id: 'security',
    icon: IconLock,
    question: 'Is my payment information secure?',
    answer:
      'Absolutely. We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed through secure payment gateways.',
    disabled: false,
  },
];

function FAQAccordion() {
  return (
    <section className='w-full max-w-2xl'>
      <div className='mb-6 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Multiple Expansion
        </Badge>
        <h2 className='text-2xl font-bold'>Frequently Asked Questions</h2>
        <p className='text-muted-foreground mt-1'>
          Find answers to common questions about our services
        </p>
      </div>

      <AccordionRoot type='multiple' defaultValue={['shipping']}>
        <div className='divide-border divide-y rounded-xl border'>
          {faqItems.map(({ id, icon: Icon, question, answer, disabled }) => (
            <AccordionItem key={id} value={id} disabled={disabled}>
              <AccordionTrigger headingLevel='h3'>
                {(props) => (
                  <Button
                    {...props}
                    variant='ghost'
                    className='group h-auto w-full justify-start gap-3 rounded-none px-4 py-4 text-left font-medium'
                  >
                    <Icon
                      size={20}
                      className='text-muted-foreground shrink-0'
                    />
                    <span className='flex-1'>{question}</span>
                    <IconChevronDown
                      size={18}
                      className='text-muted-foreground shrink-0 transition-transform duration-200 group-data-[expanded=true]:-rotate-180'
                    />
                  </Button>
                )}
              </AccordionTrigger>

              <AccordionContent>
                <div className='text-muted-foreground px-4 pb-4 pl-11 text-sm leading-relaxed'>
                  {answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      </AccordionRoot>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. Settings Panel — Dashboard-style navigation      */
/* ———————————————————————————————————————————————————— */

const settingsSections = [
  {
    id: 'profile',
    icon: IconUser,
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    settings: [
      { label: 'Display Name', value: 'Muhammad Zeeshan' },
      { label: 'Email', value: 'zeeshan@example.com' },
      { label: 'Language', value: 'English (US)' },
    ],
  },
  {
    id: 'security',
    icon: IconShield,
    title: 'Security',
    description: 'Configure authentication and security options',
    settings: [
      { label: 'Two-Factor Auth', value: 'Enabled' },
      { label: 'Last Password Change', value: '30 days ago' },
      { label: 'Active Sessions', value: '3 devices' },
    ],
  },
  {
    id: 'preferences',
    icon: IconSettings,
    title: 'Preferences',
    description: 'Customize your application experience',
    disabled: true,
    settings: [
      { label: 'Theme', value: 'System' },
      { label: 'Notifications', value: 'Email + Push' },
    ],
  },
];

function SettingsPanelAccordion() {
  return (
    <section className='w-full max-w-2xl'>
      <div className='mb-6 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Single Collapsible
        </Badge>
        <h2 className='text-2xl font-bold'>Account Settings</h2>
        <p className='text-muted-foreground mt-1'>
          One section open at a time, can collapse all
        </p>
      </div>

      <AccordionRoot type='single' defaultValue='profile' isSingleCollapsible>
        <div className='space-y-2'>
          {settingsSections.map(
            ({ id, icon: Icon, title, description, settings, disabled }) => (
              <AccordionItem key={id} value={id} disabled={disabled}>
                <div
                  className={`bg-secondary/50 overflow-hidden rounded-lg border transition-colors ${disabled ? 'opacity-50' : ''}`}
                >
                  <AccordionTrigger headingLevel='h3'>
                    {(props) => (
                      <Button
                        {...props}
                        variant='ghost'
                        className='group h-auto w-full justify-start gap-4 rounded-none p-4 text-left'
                      >
                        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
                          <Icon size={20} />
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 font-semibold'>
                            {title}
                            {disabled && (
                              <Badge variant='outline' className='text-xs'>
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                          <p className='text-muted-foreground text-sm font-normal'>
                            {description}
                          </p>
                        </div>
                        <IconChevronDown
                          size={18}
                          className='text-muted-foreground shrink-0 transition-transform duration-200 group-data-[expanded=true]:-rotate-180'
                        />
                      </Button>
                    )}
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className='bg-background border-t px-4 py-3'>
                      <div className='space-y-3'>
                        {settings.map(({ label, value }) => (
                          <div
                            key={label}
                            className='flex items-center justify-between text-sm'
                          >
                            <span className='text-muted-foreground'>
                              {label}
                            </span>
                            <span className='font-medium'>{value}</span>
                          </div>
                        ))}
                        <Button size='sm' className='mt-2 w-full'>
                          Edit Settings
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ),
          )}
        </div>
      </AccordionRoot>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Product Features — Marketing/landing page style  */
/* ———————————————————————————————————————————————————— */

const features = [
  {
    id: 'accessibility',
    title: 'Built-in Accessibility',
    badge: 'Core',
    description:
      'Every component follows WAI-ARIA guidelines with proper keyboard navigation, screen reader support, and focus management out of the box.',
  },
  {
    id: 'customization',
    title: 'Fully Customizable',
    badge: 'Flexible',
    description:
      'Render props pattern gives you complete control over markup and styling. Bring your own design system or use our sensible defaults.',
  },
  {
    id: 'typescript',
    title: 'TypeScript First',
    badge: 'DX',
    description:
      'Built with TypeScript from the ground up. Enjoy full type inference, autocomplete, and compile-time error checking.',
  },
  {
    id: 'animation',
    title: 'Smooth Animations',
    badge: 'UX',
    description:
      'Powered by motion/react for butter-smooth animations. Height transitions, enter/exit animations, and spring physics included.',
  },
];

function ProductFeaturesAccordion() {
  return (
    <section className='w-full max-w-2xl'>
      <div className='mb-6 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Single Non-Collapsible
        </Badge>
        <h2 className='text-2xl font-bold'>Why Choose Our Components?</h2>
        <p className='text-muted-foreground mt-1'>
          Always one feature highlighted, cannot collapse all
        </p>
      </div>

      <AccordionRoot
        type='single'
        defaultValue='accessibility'
        isSingleCollapsible={false}
      >
        <div className='grid gap-3'>
          {features.map(({ id, title, badge, description }) => (
            <AccordionItem key={id} value={id}>
              <div className='group/item overflow-hidden rounded-xl border transition-all data-[state=open]:ring-2 data-[state=open]:ring-blue-500/20'>
                <AccordionTrigger headingLevel='h3'>
                  {(props) => (
                    <Button
                      {...props}
                      variant='ghost'
                      className='group h-auto w-full justify-between gap-4 rounded-none p-4 text-left'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='font-semibold'>{title}</span>
                        <Badge
                          variant='outline'
                          className='bg-primary/5 text-xs'
                        >
                          {badge}
                        </Badge>
                      </div>
                      <div className='bg-primary/10 flex size-6 items-center justify-center rounded-full transition-transform group-data-[expanded=true]:rotate-45'>
                        <IconPlus size={14} className='text-primary' />
                      </div>
                    </Button>
                  )}
                </AccordionTrigger>

                <AccordionContent>
                  <div className='text-muted-foreground border-t px-4 py-4 text-sm leading-relaxed'>
                    {description}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </div>
      </AccordionRoot>
    </section>
  );
}
