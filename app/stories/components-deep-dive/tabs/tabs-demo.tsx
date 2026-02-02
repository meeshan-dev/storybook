import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs';

export function TabsDemo() {
  return (
    <main className='flex grow flex-col items-center justify-center py-10'>
      <BasicTabsPreview />
      <div className='mt-10' />
      <TabsPreviewManual />
      <div className='mt-10' />
      <TabsPreviewVertical />
    </main>
  );
}

export function BasicTabsPreview() {
  return (
    <div className='w-full max-w-md'>
      <p>
        <Badge variant='secondary'>Automatic activation</Badge>{' '}
        <Badge variant='secondary'>Loop</Badge>
      </p>

      <div className='mt-3 flex w-full flex-col items-center justify-center rounded-lg border'>
        <TabsRoot defaultValue='account' loop>
          <TabsList>
            {['account', 'security', 'billing'].map((value) => (
              <TabsTrigger key={value} value={value}>
                {(props) => (
                  <Button
                    {...props}
                    variant={props.tabIndex === 0 ? 'default' : 'ghost'}
                    className='rounded-full'
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <hr className='border-foreground/20 w-[calc(100%---spacing(4))]' />

          <TabsContent value='account'>
            <p className='font-medium'>Account</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur labore distinctio
              unde assumenda et, voluptates suscipit, hic voluptas autem magni
              quidem nulla. Eligendi, nisi asperiores.
            </p>
          </TabsContent>

          <TabsContent value='security'>
            <p className='font-medium'>Security</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur labore distinctio
              unde assumenda et, voluptates suscipit, hic voluptas autem magni
              quidem nulla. Eligendi, nisi asperiores.
            </p>
          </TabsContent>

          <TabsContent value='billing'>
            <p className='font-medium'>Billing</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur labore distinctio
              unde assumenda et, voluptates suscipit, hic voluptas autem magni
              quidem nulla. Eligendi, nisi asperiores.
            </p>
          </TabsContent>
        </TabsRoot>
      </div>
    </div>
  );
}

export function TabsPreviewManual() {
  return (
    <div className='w-full max-w-md'>
      <p>
        <Badge variant='secondary'>Manual activation</Badge>{' '}
        <Badge variant='secondary'>Non-looping</Badge>
      </p>

      <div className='mt-3 flex w-full flex-col items-center justify-center rounded-lg border'>
        <TabsRoot defaultValue='account' activationMode='manual'>
          <TabsList>
            {['account', 'security', 'billing'].map((value) => (
              <TabsTrigger key={value} value={value}>
                {(props) => (
                  <Button
                    {...props}
                    variant={props.tabIndex === 0 ? 'default' : 'ghost'}
                    className='rounded-full'
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <hr className='border-foreground/20 w-[calc(100%---spacing(4))]' />

          <TabsContent value='account'>
            <p className='font-medium'>Account</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur labore distinctio
              unde assumenda et, voluptates suscipit, hic voluptas autem magni
              quidem nulla. Eligendi, nisi asperiores.
            </p>
          </TabsContent>

          <TabsContent value='security'>
            <p className='font-medium'>Security</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur labore distinctio
              unde assumenda et, voluptates suscipit, hic voluptas autem magni
              quidem nulla. Eligendi, nisi asperiores.
            </p>
          </TabsContent>

          <TabsContent value='billing'>
            <p className='font-medium'>Billing</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur labore distinctio
              unde assumenda et, voluptates suscipit, hic voluptas autem magni
              quidem nulla. Eligendi, nisi asperiores.
            </p>
          </TabsContent>
        </TabsRoot>
      </div>
    </div>
  );
}

export function TabsPreviewVertical() {
  return (
    <div className='w-full max-w-md'>
      <p>
        <Badge variant='secondary'>Vertical orientation</Badge>{' '}
        <Badge variant='secondary'>Loop</Badge>
      </p>

      <div className='mt-3 flex w-full rounded-lg border'>
        <TabsRoot defaultValue='account' orientation='vertical' loop>
          <TabsList>
            {['account', 'security', 'billing'].map((value) => (
              <TabsTrigger key={value} value={value}>
                {(props) => (
                  <Button
                    {...props}
                    variant={props.tabIndex === 0 ? 'default' : 'ghost'}
                    className='rounded-full'
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className='bg-foreground/20 sh-[calc(100%---spacing(4))] w-px place-self-center' />

          <TabsContent value='account'>
            <p className='font-medium'>Account</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur
            </p>
          </TabsContent>

          <TabsContent value='security'>
            <p className='font-medium'>Security</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur
            </p>
          </TabsContent>

          <TabsContent value='billing'>
            <p className='font-medium'>Billing</p>
            <p className='text-muted-foreground mt-2 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              sunt quas! Perferendis molestias consequatur
            </p>
          </TabsContent>
        </TabsRoot>
      </div>
    </div>
  );
}
