'use client';
import { createContext } from 'react';
import { GenericFormContextValue } from '../types/generic-form';

const GenericFormContext = createContext<GenericFormContextValue | null>(null);

export default GenericFormContext;
