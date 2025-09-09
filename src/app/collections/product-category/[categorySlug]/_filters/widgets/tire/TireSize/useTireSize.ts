import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { TireSizeProps } from './TireSize';
import useFilter from '../../../filter-store/useFilter';

export type TireSizeFormValues = {
  frontWidth: string;
  frontRatio: string;
  frontDiameter: string;
  diffRearSize: boolean;
  rearWidth?: string;
  rearRatio?: string;
  rearDiameter?: string;
};

const defaultValues: TireSizeFormValues = {
  frontWidth: '',
  frontRatio: '',
  frontDiameter: '',
  diffRearSize: false,
  rearWidth: '',
  rearRatio: '',
  rearDiameter: '',
};

const useTireSize = (props: TireSizeProps) => {
  const searchParams = useSearchParams();
  const rawFrontParams = searchParams.get('frontParams');
  const rawRearParams = searchParams.get('rearParams');
  const { replaceFilterValue, removeSpecificFilters } = useFilter();

  const [showFilter, setShowFilter] = useState(
    // rawFrontParams || rawRearParams ? true : false // if any front or rear params are set, show filter
    true // always show filter
  );
  const toggleFilter = () => setShowFilter(!showFilter);

  // Memoize param parsing
  const { frontParams, rearParams } = useMemo(() => {
    let parsedFront: any = null;
    let parsedRear: any = null;

    try {
      if (rawFrontParams) {
        parsedFront = JSON.parse(rawFrontParams);
      } else if (rawRearParams) {
        const fallbackRear = JSON.parse(rawRearParams);
        if (
          typeof fallbackRear === 'object' &&
          fallbackRear.width &&
          fallbackRear.ratio &&
          fallbackRear.diameter
        ) {
          parsedFront = fallbackRear;
        }
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (rawFrontParams && rawRearParams) {
        parsedRear = JSON.parse(rawRearParams);
      }
    } catch (error) {
      console.log(error);
    }

    return { frontParams: parsedFront, rearParams: parsedRear };
  }, [rawFrontParams, rawRearParams]);

  // Build initial/default values
  const buildDefaultValues = (): TireSizeFormValues => {
    const values = { ...defaultValues };

    if (frontParams) {
      values.frontWidth = frontParams.width || '';
      values.frontRatio = frontParams.ratio || '';
      values.frontDiameter = frontParams.diameter || '';
    }

    if (rearParams) {
      values.diffRearSize = true;
      values.rearWidth = rearParams.width || '';
      values.rearRatio = rearParams.ratio || '';
      values.rearDiameter = rearParams.diameter || '';
    }

    return values;
  };

  const form = useForm<TireSizeFormValues>({
    defaultValues: buildDefaultValues(),
    mode: 'onChange',
  });

  const { watch, reset, handleSubmit, control, formState } = form;
  const diffRearSize = watch('diffRearSize');

  // 🔥 Reset form if URL param changes (sync)
  useEffect(() => {
    reset(buildDefaultValues());
  }, [rawFrontParams, rawRearParams, reset]);

  const validate = (values: TireSizeFormValues) => {
    if (!values.frontWidth || !values.frontRatio || !values.frontDiameter)
      return false;
    if (values.diffRearSize) {
      if (!values.rearWidth || !values.rearRatio || !values.rearDiameter)
        return false;
    }
    return true;
  };

  const onSubmit = (values: TireSizeFormValues) => {
    let result = { ...values };
    removeSpecificFilters(['frontTireSize', 'rearTireSize']);
    if (!values.diffRearSize) {
      result = {
        ...values,
        rearWidth: values.frontWidth,
        rearRatio: values.frontRatio,
        rearDiameter: values.frontDiameter,
      };
    }

    replaceFilterValue(
      'frontParams',
      JSON.stringify({
        width: result.frontWidth,
        ratio: result.frontRatio,
        diameter: result.frontDiameter,
      })
    );

    if (result.diffRearSize) {
      replaceFilterValue(
        'rearParams',
        JSON.stringify({
          width: result.rearWidth,
          ratio: result.rearRatio,
          diameter: result.rearDiameter,
        })
      );
    } else {
      replaceFilterValue('rearParams', '');
    }
  };

  const onClear = () => {
    reset(defaultValues);
  };

  return {
    showFilter,
    toggleFilter,
    form,
    control,
    handleSubmit,
    onSubmit,
    onClear,
    diffRearSize,
    validate,
    formState,
    props,
  };
};

export default useTireSize;
