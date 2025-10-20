import { useContext } from 'react';
import GenericFormContext from './GenericFormContext';
import { FieldValues } from 'react-hook-form';
import { GenericFormContextValue } from '../types/generic-form';

const useGenericForm = <T extends FieldValues = any>() => {
  const context = useContext(GenericFormContext);
  if (!context) {
    throw new Error('useGenericForm must be used within a GenericFormProvider');
  }
  return context as GenericFormContextValue<T>;
};

export default useGenericForm;
