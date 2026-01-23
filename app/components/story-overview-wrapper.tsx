export function StoryOverviewWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='p-5'>
      <div className='typography border-foreground/10 bg-foreground/5 mx-auto w-full max-w-2xl rounded-lg border p-5'>
        {children}
      </div>
    </main>
  );
}
