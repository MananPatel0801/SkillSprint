'use client';

import type { GenerateLearningPathOutput as FullLearningPath } from '@/ai/flows/generate-learning-path';
import { LearningModuleCard } from './learning-module-card';
import { useState, useEffect, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LearningPathDisplayProps {
  path: FullLearningPath;
  jobRole: string;
  onResetPath: () => void; // Callback to reset the path and allow new input
}

type ModuleCompletionState = {
  [moduleId: string]: boolean;
};

export function LearningPathDisplay({ path, jobRole, onResetPath }: LearningPathDisplayProps) {
  const [completedModules, setCompletedModules] = useState<ModuleCompletionState>({});
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const totalModules = path.learningPath.length;

  const resetProgress = useCallback(() => {
    setCompletedModules({});
    setProgress(0);
    toast({
      title: "✨ Path Reset ✨",
      description: "Your progress has been cleared. Ready to start fresh or try a new role!",
    });
  }, [toast]);

  useEffect(() => {
    // Reset progress when path or jobRole changes (new path generated)
    resetProgress();
  }, [path, jobRole, resetProgress]);

  useEffect(() => {
    const numCompleted = Object.values(completedModules).filter(Boolean).length;
    setProgress(totalModules > 0 ? (numCompleted / totalModules) * 100 : 0);

    if (totalModules > 0 && numCompleted === totalModules) {
        toast({
            title: "🎉 Congratulations! 🎉",
            description: `You've completed all modules for your ${jobRole} learning path! Well done!`,
            duration: 10000, // Longer duration for this significant achievement
        });
    }
  }, [completedModules, totalModules, jobRole, toast]);

  // Simulate a periodic "global" reminder for engagement
  useEffect(() => {
    const intervalId = setInterval(() => {
      const incompleteModules = path.learningPath.filter(
        (module) => !completedModules[`${module.week}-${module.moduleName}`]
      );
      if (incompleteModules.length > 0 && totalModules > 0 && progress < 100) { // Only remind if not complete
        const nextModule = incompleteModules[0];
        toast({
          title: "🚀 Keep Sprinting!",
          description: `Stay on track with your ${jobRole} path! Next module: Week ${nextModule.week}: ${nextModule.moduleName}.`,
          duration: 7000,
        });
      }
    }, 5 * 60 * 1000); // Dummy: every 5 minutes for demo, rather than weekly

    return () => clearInterval(intervalId);
  }, [path.learningPath, completedModules, jobRole, toast, totalModules, progress]);


  const handleModuleToggle = (moduleId: string, completed: boolean) => {
    setCompletedModules(prev => ({ ...prev, [moduleId]: completed }));
  };

  if (!path || path.learningPath.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <p className="text-xl">No learning path available.</p>
        <p>The AI might have had trouble with the provided role. Please try again with a different or more specific job title.</p>
      </div>
    );
  }

  return (
    <section className="mt-10 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 text-primary tracking-tight">Your <span className="text-accent">{jobRole}</span> Sprint</h2>
        <p className="text-lg text-muted-foreground">Follow this 6-week path to achieve your career goal. Mark modules as complete to track your progress.</p>
      </div>
      
      <div className="mb-8 p-4 bg-card rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
            <span className="text-md font-semibold text-primary">Overall Progress</span>
            <span className="text-lg font-bold text-accent">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
      </div>

      <div className="space-y-6">
        {path.learningPath.map((module, index) => (
          <LearningModuleCard
            key={`${module.week}-${module.moduleName}-${index}`} // AI might generate same module name in different weeks
            module={module}
            jobRole={jobRole}
            onModuleToggle={handleModuleToggle}
            initialCompleted={completedModules[`${module.week}-${module.moduleName}`] || false}
            isLastModule={index === totalModules - 1}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={resetProgress} variant="outline" className="text-md py-3 px-6">
          <RotateCcw className="mr-2 h-5 w-5" /> Reset Progress
        </Button>
        <Button onClick={onResetPath} variant="default" className="text-md py-3 px-6 bg-primary hover:bg-primary/90">
          Plan a New Sprint
        </Button>
      </div>
    </section>
  );
}
