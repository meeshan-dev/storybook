import { IconFlag, IconSearch, IconUser } from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Label } from '~/components/ui/label';
import { Combobox } from './combobox';

export function ComboboxDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-12 py-10'>
      <CountrySelectorCombobox />
      <UserSearchCombobox />
      <SkillsMultiSelect />
      <ProgrammingLanguagesCombobox />
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. Country Selector — Single selection with flags    */
/* ———————————————————————————————————————————————————— */

const countries = [
  { label: '🇺🇸 United States', value: 'us' },
  { label: '🇬🇧 United Kingdom', value: 'uk' },
  { label: '🇨🇦 Canada', value: 'ca' },
  { label: '🇦🇺 Australia', value: 'au' },
  { label: '🇩🇪 Germany', value: 'de' },
  { label: '🇫🇷 France', value: 'fr' },
  { label: '🇯🇵 Japan', value: 'jp' },
  { label: '🇰🇷 South Korea', value: 'kr' },
  { label: '🇮🇳 India', value: 'in' },
  { label: '🇧🇷 Brazil', value: 'br' },
  { label: '🇲🇽 Mexico', value: 'mx' },
  { label: '🇮🇹 Italy', value: 'it' },
  { label: '🇪🇸 Spain', value: 'es' },
  { label: '🇳🇱 Netherlands', value: 'nl' },
  { label: '🇸🇪 Sweden', value: 'se' },
  { label: '🇳🇴 Norway', value: 'no' },
  { label: '🇵🇰 Pakistan', value: 'pk' },
  { label: '🇦🇪 United Arab Emirates', value: 'ae' },
  { label: '🇸🇬 Singapore', value: 'sg' },
  { label: '🇨🇭 Switzerland', value: 'ch' },
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
  { label: 'Muhammad Zeeshan', value: 'zeeshan', email: 'zeeshan@example.com' },
  { label: 'Sarah Johnson', value: 'sarah', email: 'sarah@example.com' },
  { label: 'Alex Chen', value: 'alex', email: 'alex@example.com' },
  { label: 'Maria Garcia', value: 'maria', email: 'maria@example.com' },
  { label: 'James Wilson', value: 'james', email: 'james@example.com' },
  { label: 'Emily Davis', value: 'emily', email: 'emily@example.com' },
  { label: 'Michael Brown', value: 'michael', email: 'michael@example.com' },
  { label: 'Lisa Anderson', value: 'lisa', email: 'lisa@example.com' },
  { label: 'David Martinez', value: 'david', email: 'david@example.com' },
  { label: 'Emma Thompson', value: 'emma', email: 'emma@example.com' },
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
  { label: 'JavaScript', value: 'js', tier: 'free' },
  { label: 'TypeScript', value: 'ts', tier: 'free' },
  { label: 'Python', value: 'python', tier: 'free' },
  { label: 'Java', value: 'java', tier: 'pro' },
  { label: 'C++', value: 'cpp', tier: 'pro' },
  { label: 'C#', value: 'csharp', tier: 'pro' },
  { label: 'Go', value: 'go', tier: 'enterprise' },
  { label: 'Rust', value: 'rust', tier: 'enterprise' },
  { label: 'Swift', value: 'swift', tier: 'enterprise' },
  { label: 'Kotlin', value: 'kotlin', tier: 'enterprise' },
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
