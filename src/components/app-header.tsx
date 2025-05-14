import { GraduationCap } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="mb-8 flex flex-col items-center justify-center space-y-2 py-6 border-b">
      <div className="flex items-center space-x-3">
        <GraduationCap className="h-12 w-12 text-primary" />
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">
          SkillSprint
        </h1>
      </div>
      <p className="text-lg text-muted-foreground">
        Your journey to a new career starts here.
      </p>
    </header>
  );
}
