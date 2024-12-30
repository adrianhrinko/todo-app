'use client';

import { auth } from '@/lib/firebase/firebaseClient';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function PasswordResetForm() {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const handlePasswordReset = async () => {
    if (!oobCode) {
      toast.error('Error resetting password: invalid code.');
      return;
    }

    try {
      // Verify the password reset code is valid
      await verifyPasswordResetCode(auth, oobCode as string);
      // If valid, update the password
      await confirmPasswordReset(auth, oobCode as string, newPassword);
      toast.success('Password has been reset successfully!');
      router.push('/'); // Redirect to login page
    } catch {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardContent className='space-y-4 pt-6'>
          <h1 className='text-center text-xl font-bold'>Reset your password</h1>
          <Input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordReset} className='w-full'>
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
