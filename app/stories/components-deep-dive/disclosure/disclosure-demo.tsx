import {
  IconChevronDown,
  IconPlus,
  IconMinus,
  IconQuestionMark,
  IconSettings,
  IconShield,
  IconBell,
  IconPalette,
  IconCode,
  IconDatabase,
  IconLock,
} from '@tabler/icons-react';
import { cn } from '~/lib/utils';
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
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Frequently Asked Questions</h3>
          <p className='text-muted-foreground text-sm'>
            Expandable FAQ with multiple items open simultaneously
          </p>
        </div>
        <FAQSection />
      </section>

      {/* Settings Panel */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Settings Panel</h3>
          <p className='text-muted-foreground text-sm'>
            Single accordion style — only one section open at a time
          </p>
        </div>
        <SettingsPanel />
      </section>

      {/* Filter Panel */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Product Filters</h3>
          <p className='text-muted-foreground text-sm'>
            E-commerce style filter sidebar with multiple expansion
          </p>
        </div>
        <FilterPanel />
      </section>

      {/* Feature List */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Feature Details</h3>
          <p className='text-muted-foreground text-sm'>
            Non-collapsible single mode — always has one item open
          </p>
        </div>
        <FeatureList />
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
    <div className='max-w-2xl rounded-xl border'>
      <DisclosureRoot type='multiple' defaultValue={['returns']}>
        {faqItems.map((item, index) => (
          <DisclosureItem key={item.id} value={item.id}>
            <DisclosureTrigger>
              {(props) => (
                <button
                  {...props}
                  className={cn(
                    'group flex w-full items-center justify-between px-5 py-4 text-left font-medium transition-colors hover:bg-muted/50',
                    index === 0 && 'rounded-t-xl',
                    index === faqItems.length - 1 && 'rounded-b-xl',
                  )}
                >
                  <div className='flex items-center gap-3'>
                    <IconQuestionMark className='text-muted-foreground size-5' />
                    {item.question}
                  </div>
                  <span className='bg-muted flex size-6 items-center justify-center rounded-full transition-colors group-data-[expanded=true]:bg-foreground group-data-[expanded=true]:text-background'>
                    <IconPlus className='size-4 group-data-[expanded=true]:hidden' />
                    <IconMinus className='hidden size-4 group-data-[expanded=true]:block' />
                  </span>
                </button>
              )}
            </DisclosureTrigger>

            <DisclosureContent>
              <div className='text-muted-foreground border-t px-5 py-4 pl-13'>
                {item.answer}
              </div>
            </DisclosureContent>
          </DisclosureItem>
        ))}
      </DisclosureRoot>
    </div>
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
    <div className='max-w-md rounded-xl border bg-card'>
      <DisclosureRoot type='single' defaultValue='general' isSingleCollapsible>
        {settingsSections.map((section) => (
          <DisclosureItem key={section.id} value={section.id}>
            <DisclosureTrigger>
              {(props) => (
                <button
                  {...props}
                  className='group flex w-full items-center justify-between border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted/50 data-[expanded=true]:border-b'
                >
                  <div className='flex items-center gap-3'>
                    <div className='bg-muted flex size-8 items-center justify-center rounded-lg'>
                      <section.icon className='text-muted-foreground size-4' />
                    </div>
                    <span className='font-medium'>{section.title}</span>
                  </div>
                  <IconChevronDown className='text-muted-foreground size-5 transition-transform group-data-[expanded=true]:rotate-180' />
                </button>
              )}
            </DisclosureTrigger>

            <DisclosureContent>
              <div className='space-y-3 border-b px-4 py-4 last:border-b-0'>
                {section.content.map((item) => (
                  <div
                    key={item.label}
                    className='flex items-center justify-between'
                  >
                    <span className='text-muted-foreground text-sm'>
                      {item.label}
                    </span>
                    <span className='text-sm font-medium'>{item.value}</span>
                  </div>
                ))}
                <button className='mt-2 w-full rounded-lg bg-muted px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/80'>
                  Edit Settings
                </button>
              </div>
            </DisclosureContent>
          </DisclosureItem>
        ))}
      </DisclosureRoot>
    </div>
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
    options: ['Under $25', '$25 - $50', '$50 - $100', '$100 - $200', 'Over $200'],
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
    <div className='w-64 rounded-xl border bg-card'>
      <div className='border-b px-4 py-3'>
        <h4 className='font-semibold'>Filters</h4>
      </div>
      <DisclosureRoot type='multiple' defaultValue={['category', 'price']}>
        {filterGroups.map((group) => (
          <DisclosureItem key={group.id} value={group.id}>
            <DisclosureTrigger>
              {(props) => (
                <button
                  {...props}
                  className='group flex w-full items-center justify-between border-b px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50'
                >
                  {group.title}
                  <IconChevronDown className='text-muted-foreground size-4 transition-transform group-data-[expanded=true]:rotate-180' />
                </button>
              )}
            </DisclosureTrigger>

            <DisclosureContent>
              <div className='space-y-2 border-b px-4 py-3'>
                {group.options.map((option) => (
                  <label
                    key={option}
                    className='flex cursor-pointer items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      className='size-4 rounded border-gray-300'
                    />
                    <span className='text-muted-foreground text-sm'>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </DisclosureContent>
          </DisclosureItem>
        ))}
      </DisclosureRoot>
      <div className='flex gap-2 p-4'>
        <button className='flex-1 rounded-lg bg-muted px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/80'>
          Clear
        </button>
        <button className='flex-1 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90'>
          Apply
        </button>
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
    details: ['GraphQL support', 'SDK for major languages', 'Sandbox environment'],
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
    <div className='max-w-xl rounded-xl border bg-card'>
      <DisclosureRoot type='single' defaultValue='api' isSingleCollapsible={false}>
        {features.map((feature) => (
          <DisclosureItem key={feature.id} value={feature.id}>
            <DisclosureTrigger>
              {(props) => (
                <button
                  {...props}
                  className='group flex w-full items-center gap-4 border-b px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-muted/50 data-[expanded=true]:bg-blue-50 dark:data-[expanded=true]:bg-blue-950/20'
                >
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-lg transition-colors',
                      'bg-muted group-data-[expanded=true]:bg-blue-600 group-data-[expanded=true]:text-white',
                    )}
                  >
                    <feature.icon className='size-5' />
                  </div>
                  <div className='flex-1'>
                    <span className='font-semibold'>{feature.title}</span>
                    <p className='text-muted-foreground mt-0.5 text-sm group-data-[expanded=true]:hidden'>
                      Click to learn more
                    </p>
                  </div>
                  <div className='flex size-6 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transition-opacity group-data-[expanded=true]:opacity-100'>
                    <IconChevronDown className='size-4' />
                  </div>
                </button>
              )}
            </DisclosureTrigger>

            <DisclosureContent>
              <div className='border-b bg-blue-50/50 px-5 py-4 dark:bg-blue-950/10'>
                <p className='text-muted-foreground mb-3'>{feature.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {feature.details.map((detail) => (
                    <span
                      key={detail}
                      className='rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </DisclosureContent>
          </DisclosureItem>
        ))}
      </DisclosureRoot>
    </div>
  );
}
