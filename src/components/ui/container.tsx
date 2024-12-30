export function Container({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8' {...props}>
      {children}
    </div>
  );
}
