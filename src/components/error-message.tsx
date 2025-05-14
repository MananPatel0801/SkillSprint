import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
}
export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="my-6 max-w-lg mx-auto">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="font-semibold">Oops! Something went wrong.</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
