import {
  IconBell,
  IconCheck,
  IconChevronDown,
  IconCode,
  IconDatabase,
  IconLock,
  IconMinus,
  IconPalette,
  IconPlus,
  IconQuestionMark,
  IconSettings,
  IconShield,
} from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { CheckboxIcon, CheckboxRoot } from '../checkbox/checkbox';
import {
  DisclosureContent,
  DisclosureItem,
  DisclosureRoot,
  DisclosureTrigger,
} from './disclosure';

export function DisclosureDemo() {
  return (
    <main className='flex grow flex-col gap-12 py-10'>
      {/* FAQ Section */}
      <section className='flex flex-col justify-center'>
        <h3 className='text-center text-lg font-semibold'>
          Frequently Asked Questions
        </h3>
        <p className='text-muted-foreground mt-1 text-center text-sm'>
          Expandable FAQ with multiple items open simultaneously
        </p>
        <FAQSection />
      </section>

      {/* Feature List */}
      <section className='flex flex-col justify-center'>
        <h3 className='text-center text-lg font-semibold'>Feature Details</h3>
        <p className='text-muted-foreground mt-1 text-center text-sm'>
          Non-collapsible single mode — always has one item open
        </p>

        <FeatureList />
      </section>

      {/* Settings Panel */}
      <section className='flex flex-col justify-center'>
        <h3 className='text-center text-lg font-semibold'>Settings Panel</h3>
        <p className='text-muted-foreground mt-1 text-center text-sm'>
          Single accordion style — only one section open at a time
        </p>

        <SettingsPanel />
      </section>

      {/* Filter Panel */}
      <section className='flex flex-col justify-center'>
        <h3 className='text-center text-lg font-semibold'>Product Filters</h3>
        <p className='text-muted-foreground mt-1 text-center text-sm'>
          E-commerce style filter sidebar with multiple expansion
        </p>

        <FilterPanel />
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* 1. FAQ Section                      */
/* ---------------------------------- */

const faqItems = [
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return through your account dashboard or contact our support team. Refunds are processed within 5-7 business days after we receive the item.',
  },
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days within the continental US. Express shipping (2-3 days) and overnight options are available at checkout. International shipping times vary by destination, typically 10-14 business days.',
  },
  {
    id: 'warranty',
    question: 'Do you offer a warranty?',
    answer:
      'Yes! All our products come with a 1-year manufacturer warranty covering defects in materials and workmanship. Extended warranty options (up to 3 years) are available for purchase. The warranty does not cover damage from misuse or accidents.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For orders over $500, we also offer financing options through Affirm.',
  },
];

function FAQSection() {
  return (
    <DisclosureRoot type='multiple' defaultValue={['returns']} className='mt-6'>
      {faqItems.map((item) => (
        <DisclosureItem
          key={item.id}
          value={item.id}
          className='has-[[aria-expanded]:focus-visible]:border-ring has-[[aria-expanded]:focus-visible]:ring-ring/50 relative overflow-hidden border border-t-0 first:rounded-t-xl first:border-t last:rounded-b-xl has-[[aria-expanded]:focus-visible]:z-50 has-[[aria-expanded]:focus-visible]:ring-[3px]'
        >
          <DisclosureTrigger>
            {(props) => (
              <Button
                {...props}
                variant='ghost'
                className='dark:hover:bg-secondary h-auto w-full justify-start gap-3 rounded-none border-0 px-4 py-4 focus-visible:ring-0'
              >
                <IconQuestionMark className='text-muted-foreground size-5' />

                <span className='grow truncate text-start'>
                  {item.question}
                </span>

                <span className='bg-muted group-aria-expanded/button:bg-foreground group-aria-expanded/button:text-background flex size-6 items-center justify-center rounded-full transition-colors'>
                  <IconPlus className='group-aria-expanded/button:hidden' />
                  <IconMinus className='hidden group-aria-expanded/button:block' />
                </span>
              </Button>
            )}
          </DisclosureTrigger>

          <DisclosureContent className='text-muted-foreground p-3 pl-12 text-sm leading-relaxed'>
            {item.answer}
          </DisclosureContent>
        </DisclosureItem>
      ))}
    </DisclosureRoot>
  );
}

/* ---------------------------------- */
/* 2. Settings Panel                   */
/* ---------------------------------- */

const settingsSections = [
  {
    id: 'general',
    title: 'General Settings',
    icon: IconSettings,
    content: [
      { label: 'Language', value: 'English (US)' },
      { label: 'Timezone', value: 'Pacific Time (PT)' },
      { label: 'Date Format', value: 'MM/DD/YYYY' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: IconShield,
    content: [
      { label: 'Two-Factor Auth', value: 'Enabled' },
      { label: 'Login History', value: 'View all' },
      { label: 'Active Sessions', value: '2 devices' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: IconBell,
    content: [
      { label: 'Email Alerts', value: 'On' },
      { label: 'Push Notifications', value: 'On' },
      { label: 'SMS Alerts', value: 'Off' },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: IconPalette,
    content: [
      { label: 'Theme', value: 'System' },
      { label: 'Accent Color', value: 'Blue' },
      { label: 'Sidebar', value: 'Collapsed' },
    ],
  },
];

function SettingsPanel() {
  return (
    <DisclosureRoot
      type='single'
      defaultValue='general'
      isSingleCollapsible
      className='mt-6'
    >
      {settingsSections.map((section) => (
        <DisclosureItem
          key={section.id}
          value={section.id}
          className='has-[[aria-expanded]:focus-visible]:border-ring has-[[aria-expanded]:focus-visible]:ring-ring/50 relative overflow-hidden border border-t-0 first:rounded-t-xl first:border-t last:rounded-b-xl has-[[aria-expanded]:focus-visible]:z-50 has-[[aria-expanded]:focus-visible]:ring-[3px]'
        >
          <DisclosureTrigger>
            {(props) => (
              <Button
                {...props}
                variant='ghost'
                className='dark:hover:bg-secondary h-auto w-full justify-start gap-3 rounded-none border-0 px-4 py-4 focus-visible:ring-0'
              >
                <section.icon className='text-muted-foreground' />

                <span className='grow truncate text-start'>
                  {section.title}
                </span>

                <IconChevronDown className='text-muted-foreground size-5 transition-transform group-aria-expanded/button:rotate-180' />
              </Button>
            )}
          </DisclosureTrigger>

          <DisclosureContent className='text-muted-foreground space-y-3 border-b p-5 text-sm leading-relaxed last:border-b-0'>
            {section.content.map((item) => (
              <div
                key={item.label}
                className='flex items-center justify-between'
              >
                <span className='text-muted-foreground text-sm'>
                  {item.label}
                </span>
                <span className='text-end text-sm font-medium'>
                  {item.value}
                </span>
              </div>
            ))}

            <Button variant='outline' className='w-full'>
              Edit Settings
            </Button>
          </DisclosureContent>
        </DisclosureItem>
      ))}
    </DisclosureRoot>
  );
}

/* ---------------------------------- */
/* 3. Filter Panel                     */
/* ---------------------------------- */

const filterGroups = [
  {
    id: 'category',
    title: 'Category',
    options: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
  },
  {
    id: 'price',
    title: 'Price Range',
    options: [
      'Under $25',
      '$25 - $50',
      '$50 - $100',
      '$100 - $200',
      'Over $200',
    ],
  },
  {
    id: 'brand',
    title: 'Brand',
    options: ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Other'],
  },
  {
    id: 'rating',
    title: 'Customer Rating',
    options: ['4 Stars & Up', '3 Stars & Up', '2 Stars & Up', '1 Star & Up'],
  },
];

function FilterPanel() {
  return (
    <div className='mx-auto mt-6 w-64'>
      <div className='rounded-t-xl border px-4 py-3'>
        <h4 className='font-semibold'>Filters</h4>
      </div>

      <DisclosureRoot type='multiple' defaultValue={['category', 'price']}>
        {filterGroups.map((group) => (
          <DisclosureItem key={group.id} value={group.id}>
            <DisclosureTrigger>
              {(props) => (
                <Button
                  {...props}
                  variant='ghost'
                  className='dark:hover:bg-secondary border-border relative h-auto w-full gap-3 rounded-none border-t-0 px-4 py-4 focus-visible:z-50'
                >
                  <span className='grow truncate text-start'>
                    {group.title}
                  </span>
                  <IconChevronDown className='text-muted-foreground size-4 transition-transform group-data-[expanded=true]:rotate-180' />
                </Button>
              )}
            </DisclosureTrigger>

            <DisclosureContent className='text-muted-foreground space-y-2 border border-t-0 p-5 text-sm leading-relaxed'>
              {group.options.map((option) => (
                <label
                  key={option}
                  className='flex cursor-pointer items-center gap-2'
                >
                  <CheckboxRoot>
                    <CheckboxIcon type='check'>
                      <IconCheck />
                    </CheckboxIcon>
                  </CheckboxRoot>

                  <span className='text-muted-foreground text-sm'>
                    {option}
                  </span>
                </label>
              ))}
            </DisclosureContent>
          </DisclosureItem>
        ))}
      </DisclosureRoot>

      <div className='flex gap-2 rounded-b-xl border border-t-0 p-4'>
        <Button variant='outline' className='flex-1'>
          Clear
        </Button>
        <Button className='flex-1'>Apply</Button>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* 4. Feature List (Non-collapsible)   */
/* ---------------------------------- */

const features = [
  {
    id: 'api',
    title: 'API Access',
    icon: IconCode,
    description:
      'Full REST API access with comprehensive documentation. Includes rate limiting of 1000 requests/minute and webhook support for real-time updates.',
    details: [
      'GraphQL support',
      'SDK for major languages',
      'Sandbox environment',
    ],
  },
  {
    id: 'storage',
    title: 'Cloud Storage',
    icon: IconDatabase,
    description:
      'Unlimited cloud storage with automatic backups. Files are encrypted at rest and in transit with AES-256 encryption.',
    details: ['99.99% uptime SLA', 'Global CDN', 'Version history'],
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    icon: IconLock,
    description:
      'SOC 2 Type II certified with advanced threat protection. Includes SSO, SCIM provisioning, and audit logs.',
    details: ['SAML 2.0 SSO', 'IP allowlisting', 'Data residency options'],
  },
];

function FeatureList() {
  return (
    <DisclosureRoot
      type='single'
      defaultValue='api'
      isSingleCollapsible={false}
      className='mt-6'
    >
      {features.map((feature) => (
        <DisclosureItem
          key={feature.id}
          value={feature.id}
          className='has-[[aria-expanded]:focus-visible]:border-ring has-[[aria-expanded]:focus-visible]:ring-ring/50 relative overflow-hidden border border-t-0 first:rounded-t-xl first:border-t last:rounded-b-xl has-[[aria-expanded]:focus-visible]:z-50 has-[[aria-expanded]:focus-visible]:ring-[3px]'
        >
          <DisclosureTrigger>
            {(props) => (
              <Button
                {...props}
                variant='ghost'
                className='dark:hover:bg-secondary h-auto w-full justify-start gap-3 rounded-none border-0 px-4 py-4 focus-visible:ring-0'
              >
                <feature.icon className='size-5' />

                <div className='grow truncate text-start'>{feature.title}</div>

                <div className='bg-foreground text-background flex size-6 items-center justify-center rounded-full opacity-0 transition-opacity group-aria-expanded/button:opacity-100'>
                  <IconChevronDown className='size-4' />
                </div>
              </Button>
            )}
          </DisclosureTrigger>

          <DisclosureContent className='text-muted-foreground p-3 pl-12 text-sm leading-relaxed'>
            <p className='text-muted-foreground mb-3'>{feature.description}</p>

            <div className='flex flex-wrap gap-2'>
              {feature.details.map((detail) => (
                <Badge key={detail} variant='secondary'>
                  {detail}
                </Badge>
              ))}
            </div>
          </DisclosureContent>
        </DisclosureItem>
      ))}
    </DisclosureRoot>
  );
}
