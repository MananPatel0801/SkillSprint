'use client';

import { useState, useEffect } from 'react';
import type { GenerateLearningPathOutput } from '@/ai/flows/generate-learning-path';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Link as LinkIcon, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type LearningModule = GenerateLearningPathOutput['learningPath'][number];

interface LearningModuleCardProps {
  module: LearningModule;
  jobRole: string;
  onModuleToggle: (moduleId: string, completed: boolean) => void;
  initialCompleted?: boolean;
  isLastModule?: boolean;
}

export function LearningModuleCard({ module, jobRole, onModuleToggle, initialCompleted = false, isLastModule = false }: LearningModuleCardProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const { toast } = useToast();

  // Update local state if initialCompleted prop changes (e.g. parent state reset)
  useEffect(() => {
    setCompleted(initialCompleted);
  }, [initialCompleted]);

  // Effect for toast on completion (feedback)
  useEffect(() => {
    if (completed) {
      // This toast is triggered when 'completed' becomes true.
      // The "Keep Going" toast logic is better handled by LearningPathDisplay for overall progress.
    }
  }, [completed, module.week, module.moduleName, jobRole, toast]);

  const handleCheckedChange = (isChecked: boolean | 'indeterminate') => {
    // indeterminate is not used here, so we cast to boolean
    const newCompletedStatus = !!isChecked;
    setCompleted(newCompletedStatus);
    onModuleToggle(`${module.week}-${module.moduleName}`, newCompletedStatus);
    
    if (newCompletedStatus) {
      toast({
        title: "✅ Module Completed!",
        description: `You've marked Week ${module.week}: ${module.moduleName} as complete.`,
      });
      if (isLastModule) {
        // This is covered by LearningPathDisplay, but can be an alternative place for immediate feedback
        // toast({
        //   title: "🎉 Path Complete!",
        //   description: `Congratulations on finishing all modules for ${jobRole}!`,
        //   duration: 7000,
        // });
      }
    }
  };

  const uniqueId = `module-${module.week}-${module.moduleName.replace(/\s+/g, '-')}`;

  return (
    <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            {completed ? <CheckCircle2 className="h-7 w-7 text-green-500 mr-3 shrink-0" /> : <Circle className="h-7 w-7 text-muted-foreground mr-3 shrink-0" />}
            Week {module.week}: {module.moduleName}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={uniqueId}
              checked={completed}
              onCheckedChange={handleCheckedChange}
              aria-labelledby={`${uniqueId}-label`}
              className="h-6 w-6"
            />
            <Label htmlFor={uniqueId} id={`${uniqueId}-label`} className="text-sm sr-only">
              Mark Week {module.week}: {module.moduleName} as {completed ? 'incomplete' : 'complete'}
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="resources">
            <AccordionTrigger className="text-md font-medium text-accent hover:no-underline hover:text-accent/80 transition-colors">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>View Learning Resources</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              {module.resources.length > 0 ? (
                <ul className="space-y-3">
                  {module.resources.map((resource, index) => (
                    <li key={index} className="flex items-start space-x-2 text-foreground/90">
                      <LinkIcon className="h-5 w-5 text-accent mt-1 shrink-0" />
                      <a
                        href={resource.startsWith('http') ? resource : `https://www.google.com/search?q=${encodeURIComponent(resource)}`} // Search if not a full URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-accent transition-colors group"
                      >
                        {resource}
                        <ExternalLink className="inline-block h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">No specific resources listed for this module. Try searching online for related topics.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
