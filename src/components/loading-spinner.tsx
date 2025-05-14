export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-10 space-y-3">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="text-muted-foreground text-lg">Crafting your personalized learning path...</p>
    </div>
  );
}
