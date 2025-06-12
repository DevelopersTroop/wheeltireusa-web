import { useForm, Controller, useWatch } from 'react-hook-form';
import { TTireSize } from '../../useFilterByTireSize';
import React, { useEffect } from 'react';
import { useGetFilterListQuery } from '@/redux/apis/product';
import { TSingleFilter } from '@/types/filter';

type TireSizeForm = {
  frontWidth: string;
  frontAspectRatio: string;
  frontDiameter: string;
  rearWidth: string;
  rearAspectRatio: string;
  rearDiameter: string;
  differentOnRear: boolean;
};

const useTireSizeSelection = (
  setSelectedTireSizes: React.Dispatch<React.SetStateAction<TTireSize | null>>
) => {
  const { data, isLoading } = useGetFilterListQuery();
  const allWidths = (data?.filters?.width as TSingleFilter[] | undefined)?.map(
    (item) => item.value
  );
  const allAspectRatios = (
    data?.filters?.aspect_ratio as TSingleFilter[] | undefined
  )?.map((item) => item.value);
  const allDiameters = (
    data?.filters?.diameter as TSingleFilter[] | undefined
  )?.map((item) => item.value);

  const form = useForm<TireSizeForm>({
    defaultValues: {
      frontWidth: '',
      frontAspectRatio: '',
      frontDiameter: '',
      rearWidth: '',
      rearAspectRatio: '',
      rearDiameter: '',
      differentOnRear: false,
    },
  });

  // watch differentOnRear
  const differentOnRear = useWatch({
    control: form.control,
    name: 'differentOnRear',
  });

  // watch frontWidth
  const frontWidth = useWatch({
    control: form.control,
    name: 'frontWidth',
  });

  // watch frontAspectRatio
  const frontAspectRatio = useWatch({
    control: form.control,
    name: 'frontAspectRatio',
  });

  // watch frontDiameter
  const frontDiameter = useWatch({
    control: form.control,
    name: 'frontDiameter',
  });

  // watch rearWidth
  const rearWidth = useWatch({
    control: form.control,
    name: 'rearWidth',
  });

  // watch rearAspectRatio
  const rearAspectRatio = useWatch({
    control: form.control,
    name: 'rearAspectRatio',
  });

  // watch rearDiameter
  const rearDiameter = useWatch({
    control: form.control,
    name: 'rearDiameter',
  });

  // Reset rear tire fields when checkbox is unchecked
  useEffect(() => {
    if (!differentOnRear) {
      form.setValue('rearWidth', '');
      form.setValue('rearAspectRatio', '');
      form.setValue('rearDiameter', '');
    }
  }, [differentOnRear]);

  // set selected tire sizes
  useEffect(() => {
    setSelectedTireSizes({
      front: {
        width: frontWidth,
        aspectRatio: frontAspectRatio,
        diameter: frontDiameter,
      },
      rear: {
        width: differentOnRear ? (rearWidth ?? '') : '',
        aspectRatio: differentOnRear ? (rearAspectRatio ?? '') : '',
        diameter: differentOnRear ? (rearDiameter ?? '') : '',
      },
    });
  }, [
    frontWidth,
    frontAspectRatio,
    frontDiameter,
    rearWidth,
    rearAspectRatio,
    rearDiameter,
    differentOnRear,
  ]);

  return {
    form,
    differentOnRear,
    allWidths,
    allAspectRatios,
    allDiameters,
    isLoading,
  };
};

export default useTireSizeSelection;
