'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const popularJobRoles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist',
  'DevOps Engineer',
  'Product Manager',
  'UI/UX Designer',
  'Software Engineer',
  'Cloud Engineer',
  'Cybersecurity Analyst',
  'AI/ML Engineer',
  'Marketing Specialist',
  'Business Analyst'
];

const formSchema = z.object({
  jobRole: z.string().min(3, { message: 'Job role must be at least 3 characters.' }).max(100, {message: 'Job role must be 100 characters or less.'}),
});

type JobInputFormValues = z.infer<typeof formSchema>;

interface JobInputFormProps {
  onSubmit: (jobRole: string) => Promise<void>;
  isLoading: boolean;
}

export function JobInputForm({ onSubmit, isLoading }: JobInputFormProps) {
  const form = useForm<JobInputFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: '',
    },
  });

  const handleFormSubmit = (values: JobInputFormValues) => {
    onSubmit(values.jobRole);
  };

  const handleSelectChange = (value: string) => {
    if (value === "clear_selection_option_skill_sprint") {
        form.resetField('jobRole');
        form.setValue('jobRole', "", { shouldValidate: true });
    } else {
        form.setValue('jobRole', value, { shouldValidate: true });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl rounded-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Briefcase className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold">Define Your Career Goal</CardTitle>
        </div>
        <CardDescription className="text-md">
          Enter your target job role, or select from popular options. We'll craft a personalized 6-week learning path for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-medium">Target Job Role</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., AI Specialist, Quantum Physicist" 
                      {...field} 
                      className="text-md py-3 px-4" 
                      aria-label="Target Job Role"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-md font-medium">Or Select a Popular Role</FormLabel>
              <Select onValueChange={handleSelectChange} defaultValue="">
                <FormControl>
                  <SelectTrigger className="text-md py-3 px-4" aria-label="Select a popular job role">
                    <SelectValue placeholder="Choose a popular job role..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="clear_selection_option_skill_sprint" className="italic text-muted-foreground">Clear selection</SelectItem>
                  {popularJobRoles.map((role) => (
                    <SelectItem key={role} value={role} className="text-md">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>

            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 bg-accent hover:bg-accent/90 transition-colors duration-300">
              {isLoading ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                <Send className="mr-2 h-6 w-6" />
              )}
              {isLoading ? 'Generating Path...' : 'Sprint to Success!'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
