export function StoryOverviewWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='typography border-foreground/5 bg-foreground/5 max-w-none grow overflow-auto rounded-lg border p-5'>
      {children}
    </main>
  );
}
