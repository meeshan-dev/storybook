import {
  IconCheck,
  IconDownload,
  IconEdit,
  IconEye,
  IconMinus,
  IconShare,
  IconStar,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { CheckboxIcon, CheckboxRoot } from './checkbox';

export function CheckboxDemo() {
  return (
    <section data-demo className='flex grow flex-col gap-12'>
      {/* Task List */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Task List</h3>
          <p className='text-muted-foreground text-sm'>
            Manage your daily tasks with indeterminate state for groups
          </p>
        </div>

        <TaskList />
      </section>

      {/* Permissions Matrix */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Role Permissions</h3>
          <p className='text-muted-foreground text-sm'>
            Configure access permissions for different user roles
          </p>
        </div>
        <PermissionsMatrix />
      </section>

      {/* Terms & Conditions */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Account Setup</h3>
          <p className='text-muted-foreground text-sm'>
            Review and accept terms before continuing
          </p>
        </div>
        <TermsAcceptance />
      </section>

      {/* Feature Selection */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Select Features</h3>
          <p className='text-muted-foreground text-sm'>
            Choose which features to include in your plan
          </p>
        </div>
        <FeatureSelection />
      </section>
    </section>
  );
}

/* ---------------------------------- */
/* 1. Task List with Indeterminate    */
/* ---------------------------------- */

const initialTasks = [
  { id: 1, label: 'Review pull request #42', completed: true },
  { id: 2, label: 'Update documentation', completed: false },
  { id: 3, label: 'Fix navigation bug', completed: true },
  { id: 4, label: 'Write unit tests', completed: false },
];

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  const completedCount = tasks.filter((t) => t.completed).length;

  const allCompleted =
    completedCount === tasks.length
      ? true
      : completedCount === 0
        ? false
        : 'indeterminate';

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const toggleAll = () => {
    const newState = !allCompleted;
    setTasks((prev) => prev.map((t) => ({ ...t, completed: newState })));
  };

  return (
    <div className='rounded-xl border'>
      {/* Header with Select All */}
      <label
        className={cn(
          'group flex cursor-pointer items-center gap-3 border-b px-4 py-3 transition-all select-none',
          'hover:bg-muted/50',
        )}
      >
        <CheckboxRoot checked={allCompleted} onCheckedChange={toggleAll}>
          <CheckboxIcon type='indeterminate'>
            <IconMinus />
          </CheckboxIcon>

          <CheckboxIcon type='check'>
            <IconCheck />
          </CheckboxIcon>
        </CheckboxRoot>

        <span className='text-sm font-medium'>
          {allCompleted === 'indeterminate'
            ? `${completedCount} of ${tasks.length} completed`
            : allCompleted
              ? 'All tasks completed'
              : 'Select all tasks'}
        </span>
      </label>

      {/* Task Items */}
      <div className='divide-y'>
        {tasks.map((task) => (
          <label
            key={task.id}
            className={cn(
              'group flex cursor-pointer items-center gap-3 px-4 py-3 transition-all select-none',
              'hover:bg-muted/50',
              task.completed && 'bg-emerald-50/50 dark:bg-emerald-950/20',
            )}
          >
            <CheckboxRoot
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            >
              <CheckboxIcon type='check'>
                <IconCheck />
              </CheckboxIcon>
            </CheckboxRoot>

            <span
              className={cn(
                'flex-1 truncate text-sm transition-all',
                task.completed && 'text-muted-foreground line-through',
              )}
            >
              {task.label}
            </span>

            {task.completed && (
              <IconStar className='size-4 text-amber-600 dark:text-amber-400' />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* 2. Permissions Matrix               */
/* ---------------------------------- */

const permissions = [
  { id: 'view', label: 'View', icon: IconEye },
  { id: 'edit', label: 'Edit', icon: IconEdit },
  { id: 'delete', label: 'Delete', icon: IconTrash },
  { id: 'download', label: 'Download', icon: IconDownload },
  { id: 'share', label: 'Share', icon: IconShare },
];

const roles = [
  {
    id: 'admin',
    label: 'Admin',
    permissions: ['view', 'edit', 'delete', 'download', 'share'],
  },
  { id: 'editor', label: 'Editor', permissions: ['view', 'edit', 'download'] },
  { id: 'viewer', label: 'Viewer', permissions: ['view'] },
];

function PermissionsMatrix() {
  const [rolePermissions, setRolePermissions] = useState(
    roles.reduce(
      (acc, role) => ({
        ...acc,
        [role.id]: new Set(role.permissions),
      }),
      {} as Record<string, Set<string>>,
    ),
  );

  const togglePermission = (roleId: string, permissionId: string) => {
    setRolePermissions((prev) => {
      const newPerms = new Set(prev[roleId]);
      if (newPerms.has(permissionId)) {
        newPerms.delete(permissionId);
      } else {
        newPerms.add(permissionId);
      }
      return { ...prev, [roleId]: newPerms };
    });
  };

  return (
    <div className='overflow-x-auto rounded-xl border'>
      <table className='w-full'>
        <thead>
          <tr className='bg-muted/30 border-b'>
            <th className='px-4 py-3 text-start text-sm font-medium'>Role</th>
            {permissions.map((perm) => (
              <th key={perm.id} className='px-4 py-3 text-center'>
                <div className='flex flex-col items-center gap-1'>
                  <perm.icon className='text-muted-foreground size-4' />
                  <span className='text-xs font-medium'>{perm.label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y'>
          {roles.map((role) => (
            <tr key={role.id} className='hover:bg-muted/30 transition-colors'>
              <td className='px-4 py-3 text-sm font-medium'>{role.label}</td>
              {permissions.map((perm) => {
                const isChecked = rolePermissions[role.id]?.has(perm.id);
                return (
                  <td key={perm.id} className='px-4 py-3 text-center'>
                    <label className='flex cursor-pointer justify-center'>
                      <CheckboxRoot
                        checked={isChecked}
                        onCheckedChange={() =>
                          togglePermission(role.id, perm.id)
                        }
                      >
                        <CheckboxIcon type='check'>
                          <IconCheck />
                        </CheckboxIcon>
                      </CheckboxRoot>
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------- */
/* 3. Terms & Conditions               */
/* ---------------------------------- */

function TermsAcceptance() {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const canContinue = terms && privacy;

  return (
    <div className='max-w-md space-y-4'>
      <div className='space-y-3'>
        {[
          {
            label: 'Terms of Service',
            description: (
              <>
                I agree to the{' '}
                <a
                  href='#'
                  className='text-blue-600 underline dark:text-blue-400'
                >
                  Terms of Service
                </a>{' '}
                and confirm that I am at least 18 years old.
              </>
            ),
            required: true,
            checked: terms,
            onChange: setTerms,
          },
          {
            label: 'Privacy Policy',
            description: (
              <>
                I have read and understand the{' '}
                <a
                  href='#'
                  className='text-blue-600 underline dark:text-blue-400'
                >
                  Privacy Policy
                </a>
                .
              </>
            ),
            required: true,
            checked: privacy,
            onChange: setPrivacy,
          },
          {
            label: 'Marketing Communications',
            description:
              "I'd like to receive updates about new features and special offers.",
            required: false,
            checked: marketing,
            onChange: setMarketing,
          },
        ].map(({ label, description, required, checked, onChange }) => {
          return (
            <label
              key={label}
              className={cn(
                'group hover:border-foreground/20 grid cursor-pointer rounded-lg border p-4 transition-all select-none',
                checked &&
                  'border-emerald-600/50 bg-emerald-50/50 dark:border-emerald-400/50 dark:bg-emerald-950/20',
              )}
            >
              <div className='flex items-center gap-2'>
                <CheckboxRoot
                  checked={checked}
                  onCheckedChange={() => onChange(!checked)}
                >
                  <CheckboxIcon type='check'>
                    <IconCheck />
                  </CheckboxIcon>
                </CheckboxRoot>

                <p className='font-medium'>
                  {label}
                  {required && <span className='text-destructive ml-1'>*</span>}
                </p>
              </div>

              <p className='text-muted-foreground mt-1 text-sm'>
                {description}
              </p>
            </label>
          );
        })}
      </div>

      <Button disabled={!canContinue} className='w-full'>
        {canContinue ? 'Continue' : 'Please accept required terms'}
      </Button>
    </div>
  );
}

/* ---------------------------------- */
/* 4. Feature Selection                */
/* ---------------------------------- */

const features = [
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Detailed insights and reporting',
    price: '+$5/mo',
  },
  {
    id: 'api',
    name: 'API Access',
    description: 'Build integrations with our API',
    price: '+$10/mo',
  },
  {
    id: 'support',
    name: 'Priority Support',
    description: '24/7 dedicated support team',
    price: '+$15/mo',
  },
  {
    id: 'backup',
    name: 'Auto Backups',
    description: 'Daily automated backups',
    price: 'Included',
    included: true,
  },
];

function FeatureSelection() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(['backup']),
  );

  const toggleFeature = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className='grid gap-3 sm:grid-cols-2'>
      {features.map((feature) => {
        const isSelected = selected.has(feature.id);
        return (
          <label
            key={feature.id}
            className={cn(
              'group grid cursor-pointer rounded-xl border p-4 transition-all select-none',
              'hover:border-foreground/20',
              isSelected &&
                'border-blue-600/50 bg-blue-50/50 dark:border-blue-400/50 dark:bg-blue-950/20',
              feature.included && 'pointer-events-none opacity-70',
            )}
          >
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <CheckboxRoot
                  disabled={feature.included}
                  checked={isSelected}
                  onCheckedChange={() =>
                    !feature.included && toggleFeature(feature.id)
                  }
                >
                  <CheckboxIcon type='check'>
                    <IconCheck />
                  </CheckboxIcon>
                </CheckboxRoot>

                <p className='grow font-medium'>{feature.name}</p>

                <span
                  className={cn(
                    'text-sm font-medium',
                    feature.included
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground',
                  )}
                >
                  {feature.price}
                </span>
              </div>

              <p className='text-muted-foreground mt-1 text-sm'>
                {feature.description}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
