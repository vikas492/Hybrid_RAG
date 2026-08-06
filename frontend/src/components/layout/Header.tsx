interface HeaderProps {
  title: string;
  description: string;
}

export function Header({
  title,
  description,
}: HeaderProps) {
  return (
    <header className="mb-6 md:mb-8 px-4 sm:px-0">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg md:text-xl">
          {description}
        </p>
      </div>
    </header>
  );
}