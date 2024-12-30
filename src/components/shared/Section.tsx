'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Section({
  title,
  subtitle,
  icon,
  mockup = false,
  customIcon = null,
  children,
}: any) {
  useMediaQuery({ query: '(orientation: portrait)' });

  return (
    <div
      className={`flex w-full flex-col space-y-6 rounded-lg bg-muted p-6 ${
        mockup ? 'h-full' : 'min-h-[90vh]'
      }`}
    >
      <div className='flex flex-col items-center gap-6 lg:flex-row'>
        {icon && !customIcon && (
          <div className='flex aspect-square items-center justify-center rounded-xl bg-background p-8'>
            <FontAwesomeIcon icon={icon} size={'3x'} />
          </div>
        )}

        {customIcon && !icon && (
          <div className='flex aspect-square items-center justify-center rounded-xl bg-background p-8'>
            {customIcon}
          </div>
        )}

        <div className='flex flex-col justify-center gap-2 py-4 text-center lg:text-left'>
          <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
            {title}
          </h2>
          <p className='text-sm text-muted-foreground'>{subtitle}</p>
        </div>
      </div>

      <div className='h-px bg-border' />

      <div>{children}</div>
    </div>
  );
}
