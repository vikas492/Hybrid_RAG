interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-4 px-1 sm:px-0">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </header>
  );
}