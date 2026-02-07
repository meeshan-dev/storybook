import { IconFlag, IconSearch, IconUser } from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Label } from '~/components/ui/label';
import { Combobox } from './combobox';

export function ComboboxDemo() {
  return (
    <section
      data-demo
      className='flex grow flex-col items-center justify-center gap-12'
    >
      <CountrySelectorCombobox />
      <UserSearchCombobox />
      <SkillsMultiSelect />
      <ProgrammingLanguagesCombobox />
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. Country Selector — Single selection with flags    */
/* ———————————————————————————————————————————————————— */

const countries = [
  { label: '🇺🇸 United States', value: 'United States' },
  { label: '🇬🇧 United Kingdom', value: 'United Kingdom' },
  { label: '🇨🇦 Canada', value: ' Canada' },
  { label: '🇦🇺 Australia', value: ' Australia' },
  { label: '🇩🇪 Germany', value: ' Germany' },
  { label: '🇫🇷 France', value: ' France' },
  { label: '🇯🇵 Japan', value: ' Japan' },
  { label: '🇰🇷 South Korea', value: 'South Korea' },
  { label: '🇮🇳 India', value: ' India' },
  { label: '🇧🇷 Brazil', value: ' Brazil' },
  { label: '🇲🇽 Mexico', value: ' Mexico' },
  { label: '🇮🇹 Italy', value: ' Italy' },
  { label: '🇪🇸 Spain', value: ' Spain' },
  { label: '🇳🇱 Netherlands', value: ' Netherlands' },
  { label: '🇸🇪 Sweden', value: ' Sweden' },
  { label: '🇳🇴 Norway', value: ' Norway' },
  { label: '🇵🇰 Pakistan', value: ' Pakistan' },
  { label: '🇦🇪 United Arab Emirates', value: ' UnitedArab Emirates' },
  { label: '🇸🇬 Singapore', value: ' Singapore' },
  { label: '🇨🇭 Switzerland', value: ' Switzerland' },
];

function CountrySelectorCombobox() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Single Selection
        </Badge>
        <h2 className='text-xl font-bold'>Country Selector</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Search and select your country with flag icons
        </p>
      </div>

      <div className='space-y-2'>
        <Label className='flex items-center gap-2'>
          <IconFlag size={16} />
          Country of Residence
        </Label>
        <Combobox options={countries} placeholder='Search countries...' />
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. User Search — Team member assignment              */
/* ———————————————————————————————————————————————————— */

const teamMembers = [
  { label: 'Muhammad Zeeshan', value: 'Muhammad Zeeshan' },
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Alex Chen', value: 'Alex Chen' },
  { label: 'Maria Garcia', value: 'Maria Garcia' },
  { label: 'James Wilson', value: 'James Wilson' },
  { label: 'Emily Davis', value: 'Emily Davis' },
  { label: 'Michael Brown', value: 'Michael Brown' },
  { label: 'Lisa Anderson', value: 'Lisa Anderson' },
  { label: 'David Martinez', value: 'David Martinez' },
  { label: 'Emma Thompson', value: 'Emma Thompson' },
].map((m) => ({ label: m.label, value: m.value }));

function UserSearchCombobox() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          User Search
        </Badge>
        <h2 className='text-xl font-bold'>Assign Team Member</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Find and assign tasks to team members
        </p>
      </div>

      <div className='space-y-2'>
        <Label className='flex items-center gap-2'>
          <IconUser size={16} />
          Assignee
        </Label>
        <Combobox options={teamMembers} placeholder='Search team members...' />
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Skills Multi-Select — Job application form        */
/* ———————————————————————————————————————————————————— */

const skills = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'MongoDB', value: 'mongodb' },
  { label: 'Redis', value: 'redis' },
  { label: 'Docker', value: 'docker' },
  { label: 'Kubernetes', value: 'kubernetes' },
  { label: 'AWS', value: 'aws' },
  { label: 'Git', value: 'git' },
  { label: 'CI/CD', value: 'cicd' },
  { label: 'Agile/Scrum', value: 'agile' },
  { label: 'System Design', value: 'system-design' },
];

function SkillsMultiSelect() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Multiple Selection
        </Badge>
        <h2 className='text-xl font-bold'>Technical Skills</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Select all skills that apply to you
        </p>
      </div>

      <div className='space-y-2'>
        <Label className='flex items-center gap-2'>
          <IconSearch size={16} />
          Skills & Technologies
        </Label>
        <Combobox multiple options={skills} placeholder='Search skills...' />
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  4. With Disabled Options — Subscription tiers        */
/* ———————————————————————————————————————————————————— */

const programmingLanguages = [
  { label: 'JavaScript', value: 'JavaScript', tier: 'free' },
  { label: 'TypeScript', value: 'TypeScript', tier: 'free' },
  { label: 'Python', value: 'Python', tier: 'free' },
  { label: 'Java', value: 'Java', tier: 'pro' },
  { label: 'C++', value: 'C++', tier: 'pro' },
  { label: 'C#', value: 'C#', tier: 'pro' },
  { label: 'Go', value: 'Go', tier: 'enterprise' },
  { label: 'Rust', value: 'Rust', tier: 'enterprise' },
  { label: 'Swift', value: 'Swift', tier: 'enterprise' },
  { label: 'Kotlin', value: 'Kotlin', tier: 'enterprise' },
].map((l) => ({
  label: `${l.label} ${l.tier !== 'free' ? `(${l.tier})` : ''}`,
  value: l.value,
  disabled: l.tier !== 'free',
}));

function ProgrammingLanguagesCombobox() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Disabled Options
        </Badge>
        <h2 className='text-xl font-bold'>Supported Languages</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Pro and Enterprise tiers unlock more languages
        </p>
      </div>

      <div className='space-y-2'>
        <Label>Primary Language</Label>
        <Combobox
          multiple
          options={programmingLanguages.map((l) => ({
            label: l.label,
            value: l.value,
          }))}
          getOptionDisabled={(opt) => {
            const lang = programmingLanguages.find(
              (l) => l.value === opt.value,
            );
            return lang?.disabled ?? false;
          }}
          placeholder='Search languages...'
        />
        <p className='text-muted-foreground text-xs'>
          Upgrade to Pro or Enterprise to access more languages
        </p>
      </div>
    </section>
  );
}
