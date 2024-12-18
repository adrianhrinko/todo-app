export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-4 max-w-7xl mx-auto min-h-screen p-4">
      {children}
    </div>
  );
}
