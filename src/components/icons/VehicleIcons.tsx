import React from 'react';

// Common icon properties for consistent stroke and size
interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const SedanIcon = ({ className, size = 32, strokeWidth = 1.5 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export const SUVIcon = ({ className, size = 32, strokeWidth = 1.5 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19.5 17h1.5c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1H20l-1-4h-4l-.5 4H10l-1.5-4H4l-1.5 4H2c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h1.5" />
    <circle cx="6" cy="17" r="2" />
    <path d="M8 17h8" />
    <circle cx="18" cy="17" r="2" />
  </svg>
);

export const HatchIcon = ({ className, size = 32, strokeWidth = 1.5 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 17h1" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
    <path d="M19 17h1c.6 0 1-.4 1-1v-5c0-.9-.7-1.7-1.5-1.9C18.7 8.6 16 8 16 8l-2-3H5c-.6 0-1.1.4-1.4.9L2 10v6c0 .6.4 1 1 1h1" />
    <path d="M20 9V7" />
  </svg>
);

export const PicapeIcon = ({ className, size = 32, strokeWidth = 1.5 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 11V6c0-1.1-.9-2-2-2h-3l-2 5" />
    <path d="M19 17h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1H2" />
    <path d="M2 11v5c0 .6.4 1 1 1h1" />
    <circle cx="5" cy="17" r="2" />
    <path d="M7 17h10" />
    <circle cx="19" cy="17" r="2" />
  </svg>
);

export const MotoIcon = ({ className, size = 32, strokeWidth = 1.5 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3.2-1.8" />
    <path d="M5.5 17.5L9 9h4.9l4.6 8.5" />
    <path d="M14 6h3" />
    <path d="M13.5 12L15 6" />
  </svg>
);
