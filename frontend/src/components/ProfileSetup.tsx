import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User } from 'lucide-react';
import { useSaveCallerUserProfile } from '@/hooks/useQueries';
import { toast } from 'sonner';

interface ProfileSetupProps {
  onClose: () => void;
}

export default function ProfileSetup({ onClose }: ProfileSetupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const saveProfileMutation = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    saveProfileMutation.mutate(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () => {
          toast.success('Profile saved successfully!');
          onClose();
        },
        onError: () => {
          toast.error('Failed to save profile. Please try again.');
        },
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[400px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl">Welcome!</DialogTitle>
          </div>
          <DialogDescription>
            Please set up your profile to continue. This helps us identify you
            in the admin panel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Your Name *</Label>
            <Input
              id="profile-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email (optional)</Label>
            <Input
              id="profile-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={saveProfileMutation.isPending}
            className="w-full"
          >
            {saveProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
