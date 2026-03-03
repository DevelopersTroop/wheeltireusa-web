import {
  getBodyTypes,
  getMakes,
  getModels,
  getSubModels,
  getVehicleData,
  getYears,
} from '@/lib/driver-right-api';
import {
  setYmm,
  addToGarage,
  submitYmm,
} from '@/redux/features/yearMakeModelSlice';
import { useTypedSelector } from '@/redux/store';
import {
  useGetYearsQuery,
  useGetMakesQuery,
  useGetModelsQuery,
  useGetBodyTypesQuery,
  useGetSubModelsQuery,
  useGetVehicleDataQuery,
} from '@/redux/apis/ymmApi';

import { TYmmGarageItem } from '@/types/ymm';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useYmm = (ymmId?: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const defaultMakeValue = '__DEFAULT_MAKE__';
  const defaultModelValue = '__DEFAULT_MODEL__';
  const defaultBodyTypeValue = '__DEFAULT_BODYTYPE__';
  const defaultSubModelValue = '__DEFAULT_SUBMODEL__';

  const [selectedVehicle, setSelectedVehicle] = useState<{
    year?: string;
    make?: string;
    model?: string;
    bodyType?: string;
    subModel?: {
      SubModel?: string;
      DRChassisID?: string;
      DRModelID?: string;
    };
    vehicleInformation?: {
      supportedWheels: {
        diameter: number;
        width: number;
        upStepType: string;
        minOffset: number;
        maxOffset: number;
        comments: string;
      }[];
      boltPattern: string;
      frontRimSize: string;
      rearRimSize: string;
      frontCenterBore: string;
      rearCenterBore: string;
      maxWheelLoad: string;
      tireSizes: Record<'front' | 'rear', string>[];
      tireSizesList?: string[];
    };
  } | null>(null);

  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const ymm = useTypedSelector((state) => state.persisted.yearMakeModel);

  // Compute effective values (selectedVehicle local state takes precedence over Redux)
  const effectiveYear = selectedVehicle?.year ?? ymm.year;
  const effectiveMake = selectedVehicle?.make ?? ymm.make;
  const effectiveModel = selectedVehicle?.model ?? ymm.model;
  const effectiveBodyType = selectedVehicle?.bodyType ?? ymm.bodyType;

  const isValidMake = !!effectiveMake && effectiveMake !== defaultMakeValue;
  const isValidModel = !!effectiveModel && effectiveModel !== defaultModelValue;
  const isValidBodyType =
    !!effectiveBodyType && effectiveBodyType !== defaultBodyTypeValue;

  // ─── RTK Query hooks (auto-cached, no refetch if params unchanged) ───

  const { data: years, isLoading: isYearLoading } = useGetYearsQuery();

  const { data: makes, isLoading: isMakeLoading } = useGetMakesQuery(
    { year: effectiveYear },
    { skip: !effectiveYear }
  );

  const { data: models, isLoading: isModelLoading } = useGetModelsQuery(
    { year: effectiveYear, make: effectiveMake },
    { skip: !effectiveYear || !isValidMake }
  );

  const { data: bodyTypes, isLoading: isBodyTypeLoading } =
    useGetBodyTypesQuery(
      { year: effectiveYear, make: effectiveMake, model: effectiveModel },
      { skip: !effectiveYear || !effectiveMake || !isValidModel }
    );

  const { data: subModels, isLoading: isSubmodelLoading } =
    useGetSubModelsQuery(
      {
        year: effectiveYear,
        make: effectiveMake,
        model: effectiveModel,
        bodyType: effectiveBodyType,
      },
      {
        skip:
          !effectiveYear ||
          !effectiveMake ||
          !effectiveModel ||
          !isValidBodyType,
      }
    );

  // Vehicle data query (only when we have chassis/model IDs)
  // Fall back to Redux subModel so garage selection also triggers this query
  const chassisId =
    selectedVehicle?.subModel?.DRChassisID ?? ymm.subModel?.DRChassisID ?? '';
  const modelId =
    selectedVehicle?.subModel?.DRModelID ?? ymm.subModel?.DRModelID ?? '';

  const {
    data: vehicleData,
    isLoading: isVehicleDataLoading,
    isFetching: isVehicleDataFetching,
  } = useGetVehicleDataQuery(
    { modelId, chassisId },
    { skip: !chassisId || !modelId }
  );

  // ─── Sync RTK Query data back to Redux (for other consumers) ───

  useEffect(() => {
    if (years && years.length > 0) {
      dispatch(setYmm({ list: { years } }));
    }
  }, [years, dispatch]);

  useEffect(() => {
    if (makes) {
      dispatch(setYmm({ list: { makes } }));
    }
  }, [makes, dispatch]);

  useEffect(() => {
    if (models) {
      dispatch(setYmm({ list: { models } }));
    }
  }, [models, dispatch]);

  useEffect(() => {
    if (bodyTypes) {
      dispatch(setYmm({ list: { bodyTypes } }));
    }
  }, [bodyTypes, dispatch]);

  useEffect(() => {
    if (subModels) {
      dispatch(setYmm({ list: { subModels } }));
    }
  }, [subModels, dispatch]);

  // Sync vehicle data to local state when it arrives
  useEffect(() => {
    if (vehicleData) {
      setSelectedVehicle((prev) => ({
        ...prev,
        vehicleInformation: vehicleData,
      }));
    }
  }, [vehicleData]);

  // Sync vehicle data to Redux so product pages can read it
  useEffect(() => {
    if (vehicleData) {
      dispatch(setYmm({ vehicleInformation: vehicleData }));
    }
  }, [vehicleData, dispatch]);

  // ─── Reset & validation logic ───

  // Reset local state when Redux state is cleared (e.g., clearYearMakeModel)
  useEffect(() => {
    if (!ymm.year && !ymm.make && !ymm.model && !ymm.bodyType) {
      setSelectedVehicle(null);
      setIsDisabledSubmit(true);
    }
  }, [ymm.year, ymm.make, ymm.model, ymm.bodyType]);

  // Enable submit button when vehicleData (bolt pattern) is available
  useEffect(() => {
    if (selectedVehicle?.vehicleInformation?.boltPattern) {
      setIsDisabledSubmit(false);
    } else {
      setIsDisabledSubmit(true);
    }
  }, [selectedVehicle?.vehicleInformation]);

  // Ensure invalid selections are cleared when lists update
  useEffect(() => {
    if (
      makes &&
      selectedVehicle?.make &&
      !makes.includes(selectedVehicle.make)
    ) {
      setSelectedVehicle((prev) => ({ ...prev, make: undefined }));
    }
  }, [makes]);

  useEffect(() => {
    if (
      models &&
      selectedVehicle?.model &&
      !models.includes(selectedVehicle.model)
    ) {
      setSelectedVehicle((prev) => ({
        ...prev,
        model: defaultModelValue,
      }));
    }
  }, [models]);

  useEffect(() => {
    if (
      bodyTypes &&
      selectedVehicle?.bodyType &&
      !bodyTypes.includes(selectedVehicle.bodyType)
    ) {
      setSelectedVehicle((prev) => ({
        ...prev,
        bodyType: defaultBodyTypeValue,
      }));
    }
  }, [bodyTypes]);

  useEffect(() => {
    const hasSubModel = !!selectedVehicle?.subModel?.SubModel;
    const exists =
      hasSubModel && subModels
        ? subModels.some(
            (sm: { SubModel: string }) =>
              sm.SubModel === selectedVehicle?.subModel?.SubModel
          )
        : false;
    if (hasSubModel && !exists) {
      setSelectedVehicle((prev) => ({
        ...prev,
        subModel: { SubModel: defaultSubModelValue },
      }));
    }
  }, [subModels]);

  // ─── Change handlers ───

  const markActiveYmmInstance = () => {
    if (ymmId && ymm.activeYmmInstanceId !== ymmId) {
      dispatch(setYmm({ activeYmmInstanceId: ymmId }));
    }
  };

  const onYearChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newYear = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      year: newYear,
      make: defaultMakeValue,
      model: defaultModelValue,
      bodyType: defaultBodyTypeValue,
      subModel: { SubModel: defaultSubModelValue },
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        year: newYear,
        make: defaultMakeValue,
        model: defaultModelValue,
        bodyType: defaultBodyTypeValue,
        subModel: {
          SubModel: defaultSubModelValue,
          DRChassisID: '',
          DRModelID: '',
        },
        vehicleInformation: {
          boltPattern: '',
          frontRimSize: '',
          rearRimSize: '',
          frontCenterBore: '',
          rearCenterBore: '',
          maxWheelLoad: '',
          tireSizes: [],
          supportedWheels: [],
        },
      })
    );
    setIsDisabledSubmit(true);
  };

  const onMakeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newMake = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      make: newMake,
      model: defaultModelValue,
      bodyType: defaultBodyTypeValue,
      subModel: { SubModel: defaultSubModelValue },
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        make: newMake,
        model: defaultModelValue,
        bodyType: defaultBodyTypeValue,
        subModel: {
          SubModel: defaultSubModelValue,
          DRChassisID: '',
          DRModelID: '',
        },
        vehicleInformation: {
          boltPattern: '',
          frontRimSize: '',
          rearRimSize: '',
          frontCenterBore: '',
          rearCenterBore: '',
          maxWheelLoad: '',
          tireSizes: [],
          supportedWheels: [],
        },
      })
    );
    setIsDisabledSubmit(true);
  };

  const onModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newModel = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      model: newModel,
      bodyType: defaultBodyTypeValue,
      subModel: { SubModel: defaultSubModelValue },
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        model: newModel,
        bodyType: defaultBodyTypeValue,
        subModel: {
          SubModel: defaultSubModelValue,
          DRChassisID: '',
          DRModelID: '',
        },
        vehicleInformation: {
          boltPattern: '',
          frontRimSize: '',
          rearRimSize: '',
          frontCenterBore: '',
          rearCenterBore: '',
          maxWheelLoad: '',
          tireSizes: [],
          supportedWheels: [],
        },
      })
    );
    setIsDisabledSubmit(true);
  };

  const onBodyTypeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newBodyType = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      bodyType: newBodyType,
      subModel: { SubModel: defaultSubModelValue },
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        bodyType: newBodyType,
        subModel: {
          SubModel: defaultSubModelValue,
          DRChassisID: '',
          DRModelID: '',
        },
        vehicleInformation: {
          boltPattern: '',
          frontRimSize: '',
          rearRimSize: '',
          frontCenterBore: '',
          rearCenterBore: '',
          maxWheelLoad: '',
          tireSizes: [],
          supportedWheels: [],
        },
      })
    );
    setIsDisabledSubmit(true);
  };

  const onSubModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const value = typeof data === 'string' ? data : data.target.value;
    if (subModels) {
      setSelectedVehicle((prev) => ({
        ...prev,
        subModel: subModels.find(
          (subModel: { SubModel: string }) => subModel.SubModel === value
        ) as (typeof subModels)[0],
      }));
    }
  };

  // ─── Submit ───

  const onSubmit = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    options?: { targetPath?: string }
  ) => {
    if (e) e.preventDefault();

    if (pathname && !pathname.includes('/collections')) {
      const path =
        options?.targetPath || '/collections/product-category/wheels';
      router.push(path);
    }
  };

  // ─── Return values (same API surface as before) ───

  // Use RTK Query data directly for lists, falling back to Redux
  const listData = {
    years: years ?? ymm.list?.years ?? [],
    makes: makes ?? ymm.list?.makes ?? [],
    models: models ?? ymm.list?.models ?? [],
    bodyTypes: bodyTypes ?? ymm.list?.bodyTypes ?? [],
    subModels: subModels ?? ymm.list?.subModels ?? [],
  };

  return {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isBodyTypeLoading,
    isSubmodelLoading,
    isYearDisabled: isYearLoading,
    isMakeDisabled:
      !effectiveYear || isMakeLoading || (listData.makes.length ?? 0) === 0,
    isModelDisabled:
      !isValidMake || isModelLoading || (listData.models.length ?? 0) === 0,
    isBodyTypeDisabled:
      !isValidModel ||
      isBodyTypeLoading ||
      (listData.bodyTypes.length ?? 0) === 0,
    isSubmodelDisabled:
      !isValidBodyType ||
      isSubmodelLoading ||
      (listData.subModels.length ?? 0) === 0,
    shouldShowSubmit:
      (selectedVehicle?.subModel?.DRChassisID &&
        !isVehicleDataLoading &&
        !isVehicleDataFetching) ||
      !Boolean(selectedVehicle?.subModel?.DRChassisID),
    onYearChange,
    onMakeChange,
    onModelChange,
    onBodyTypeChange,
    onSubModelChange,
    onSubmit,
    isDisabledSubmit,
    isActive: !ymmId || ymm.activeYmmInstanceId === ymmId,
    ...ymm,
    ...selectedVehicle,
    list: listData,
    year: effectiveYear,
    make: effectiveMake,
    model: effectiveModel,
    bodyType: effectiveBodyType,
    subModel: selectedVehicle?.subModel ?? ymm.subModel,
    vehicleInformation:
      selectedVehicle?.vehicleInformation ?? ymm.vehicleInformation,
  };
};

export default useYmm;
