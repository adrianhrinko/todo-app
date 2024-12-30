import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <h3 className='text-base font-semibold'>Product</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Features
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Pricing
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-base font-semibold'>Company</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Blog
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-base font-semibold'>Legal</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors hover:text-foreground'>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-base font-semibold'>Connect</h3>
            <div className='flex gap-4'>
              <Button
                variant='ghost'
                size='icon'
                aria-label='GitHub'
                className='hover:bg-muted'
              >
                <Github className='size-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Twitter'
                className='hover:bg-muted'
              >
                <Twitter className='size-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                aria-label='LinkedIn'
                className='hover:bg-muted'
              >
                <Linkedin className='size-5' />
              </Button>
            </div>
          </div>
        </div>
        <div className='text-sm text-muted-foreground'>
          © {new Date().getFullYear()} Acme Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
