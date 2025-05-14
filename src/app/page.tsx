'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { JobInputForm } from '@/components/job-input-form';
import { LearningPathDisplay } from '@/components/learning-path-display';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ErrorMessage } from '@/components/error-message';
import { generateLearningPathAction } from '@/lib/actions';
import type { GenerateLearningPathOutput } from '@/ai/flows/generate-learning-path';
import { Separator } from '@/components/ui/separator';

export default function SkillSprintPage() {
  const [learningPath, setLearningPath] = useState<GenerateLearningPathOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentJobRole, setCurrentJobRole] = useState<string>('');

  const handleGeneratePath = async (jobRole: string) => {
    setIsLoading(true);
    setError(null);
    setLearningPath(null); // Clear previous path
    setCurrentJobRole(jobRole);

    const result = await generateLearningPathAction({ jobRole });

    if (result.error) {
      setError(result.error);
      setLearningPath(null);
    } else if (result.data) {
      setLearningPath(result.data);
    } else {
      setError('Received an unexpected response from the server. Please try again.');
      setLearningPath(null);
    }
    setIsLoading(false);
  };

  const handleResetPathForNewInput = () => {
    setLearningPath(null);
    setError(null);
    setCurrentJobRole('');
    // Optional: scroll to top or to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-8">
        {!learningPath && (
          <JobInputForm onSubmit={handleGeneratePath} isLoading={isLoading} />
        )}
        
        {isLoading && <LoadingSpinner />}
        
        {error && !isLoading && <ErrorMessage message={error} />}
        
        {learningPath && !isLoading && !error && (
          <>
            <LearningPathDisplay 
              path={learningPath} 
              jobRole={currentJobRole} 
              onResetPath={handleResetPathForNewInput}
            />
          </>
        )}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-12">
        <p>&copy; {new Date().getFullYear()} SkillSprint. All rights reserved.</p>
        <p>Powered by AI to help you achieve your career goals.</p>
      </footer>
    </div>
  );
}
