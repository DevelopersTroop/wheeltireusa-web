import { FitmentVehicleResponse } from '@/lib/fitment-api';
import { setYmm } from '@/redux/features/yearMakeModelSlice';
import { useTypedSelector } from '@/redux/store';
import {
  useGetDrivesQuery,
  useGetMakesQuery,
  useGetModelsQuery,
  useGetTrimsQuery,
  useGetVehicleDataQuery,
  useGetYearsQuery,
  useGetUpstepWheelsByChassisIDQuery,
  useGetVehicleDataFromDRDNAQuery,
} from '@/redux/apis/ymmApi';
import { TYmmVehicleInformation } from '@/types/ymm';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useYmm = (ymmId?: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const defaultMakeValue = '__DEFAULT_MAKE__';
  const defaultModelValue = '__DEFAULT_MODEL__';
  const defaultTrimValue = '__DEFAULT_TRIM__';
  const defaultDriveValue = '__DEFAULT_DRIVE__';

  const [selectedVehicle, setSelectedVehicle] = useState<{
    year?: string;
    make?: string;
    model?: string;
    trim?: string;
    drive?: string;
    vehicleInformation?: TYmmVehicleInformation;
  } | null>(null);

  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const ymm = useTypedSelector((state) => state.persisted.yearMakeModel);

  const effectiveYear = selectedVehicle?.year ?? ymm.year;
  const effectiveMake = selectedVehicle?.make ?? ymm.make;
  const effectiveModel = selectedVehicle?.model ?? ymm.model;
  const effectiveTrim = selectedVehicle?.trim ?? ymm.trim;
  const effectiveDrive = selectedVehicle?.drive ?? ymm.drive;

  const isValidMake = !!effectiveMake && effectiveMake !== defaultMakeValue;
  const isValidModel = !!effectiveModel && effectiveModel !== defaultModelValue;
  const isValidTrim = !!effectiveTrim && effectiveTrim !== defaultTrimValue;
  const isValidDrive = !!effectiveDrive && effectiveDrive !== defaultDriveValue;

  const { data: years, isLoading: isYearLoading, isFetching: isYearFetching } = useGetYearsQuery();

  const { data: makes, isLoading: isMakeLoading, isFetching: isMakeFetching } = useGetMakesQuery(
    { year: effectiveYear },
    { skip: !effectiveYear }
  );

  const { data: models, isLoading: isModelLoading, isFetching: isModelFetching } = useGetModelsQuery(
    { year: effectiveYear, make: effectiveMake },
    { skip: !effectiveYear || !isValidMake }
  );

  const { data: trims, isLoading: isTrimLoading, isFetching: isTrimFetching } = useGetTrimsQuery(
    { year: effectiveYear, make: effectiveMake, model: effectiveModel },
    { skip: !effectiveYear || !isValidMake || !isValidModel }
  );

  const { data: drives, isLoading: isDriveLoading, isFetching: isDriveFetching } = useGetDrivesQuery(
    {
      year: effectiveYear,
      make: effectiveMake,
      model: effectiveModel,
      trim: effectiveTrim,
    },
    { skip: !effectiveYear || !isValidMake || !isValidModel || !isValidTrim }
  );

  const {
    data: vehicleData,
    isLoading: isVehicleDataLoading,
    isFetching: isVehicleDataFetching,
  } = useGetVehicleDataQuery(
    {
      year: effectiveYear,
      make: effectiveMake,
      model: effectiveModel,
      trim: effectiveTrim,
      drive: effectiveDrive,
    },
    {
      skip:
        !effectiveYear ||
        !isValidMake ||
        !isValidModel ||
        !isValidTrim ||
        !isValidDrive,
    }
  );

  const { data: upstepWheels } = useGetUpstepWheelsByChassisIDQuery(
    { chassisID: (vehicleData?.vehicle_details_2?.drchassisid ?? '') as string },
    { skip: !vehicleData?.vehicle_details_2?.drchassisid }
  );
  const { data: drdVehicleDataNA } = useGetVehicleDataFromDRDNAQuery(
    {
      DRDModelID: (vehicleData?.vehicle_details_2?.drmodelid ?? '') as string,
      DRDChassisID: (vehicleData?.vehicle_details_2?.drchassisid ?? '') as string,
    },
    {
      skip:
        !vehicleData?.vehicle_details_2?.drmodelid ||
        !vehicleData?.vehicle_details_2?.drchassisid,
    }
  );

  const emptyVehicleInformation: TYmmVehicleInformation = {
    boltPattern: '',
    frontRimSize: '',
    rearRimSize: '',
    frontCenterBore: '',
    rearCenterBore: '',
    maxWheelLoad: '',
    tireSizes: [],
    supportedWheels: [],
    vehicle_details_2: null,
    tire_fitment: null,
    afterMarketDRSizes: [],
    VehicleDataFromDRD_NA: null,
  };

  const normalizeVehicleInfo = (
    response?: FitmentVehicleResponse
  ): TYmmVehicleInformation => {
    if (!response) return emptyVehicleInformation;
    const details = response.vehicle_details_2;
    const frontTire = details?.stockTireSize || '';
    const rearTire = details?.stockTireSizeRear || frontTire;
    return {
      boltPattern: details?.boltpattern || '',
      frontRimSize: details?.stockWheelDiameter || '',
      rearRimSize: details?.stockWheelDiameterRear || details?.stockWheelDiameter || '',
      frontCenterBore: details?.hub || '',
      rearCenterBore: details?.hub || '',
      maxWheelLoad: '',
      tireSizes: frontTire
        ? [
            {
              front: frontTire,
              rear: rearTire,
            },
          ]
        : [],
      supportedWheels: [],
      vehicle_details_2: details ?? null,
      tire_fitment: response.tire_fitment ?? null,
      afterMarketDRSizes: [],
      VehicleDataFromDRD_NA: null,
    };
  };

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
    if (trims) {
      dispatch(setYmm({ list: { trims } }));
    }
  }, [trims, dispatch]);

  useEffect(() => {
    if (drives) {
      dispatch(
        setYmm({
          list: {
            drives,
          },
        })
      );
    }
  }, [drives, dispatch]);

  useEffect(() => {
    if (vehicleData) {
      const normalized = normalizeVehicleInfo(vehicleData);
      setSelectedVehicle((prev) => ({
        ...prev,
        vehicleInformation: normalized,
      }));
      dispatch(setYmm({ vehicleInformation: normalized }));
    }
  }, [vehicleData, dispatch]);

  useEffect(() => {
    if (upstepWheels && upstepWheels.length) {
      dispatch(setYmm({ vehicleInformation: { afterMarketDRSizes: upstepWheels } }));
    }
  }, [upstepWheels, dispatch]);

  useEffect(() => {
    if (drdVehicleDataNA) {
      dispatch(setYmm({ vehicleInformation: { VehicleDataFromDRD_NA: drdVehicleDataNA } }));
    }
  }, [drdVehicleDataNA, dispatch]);

  useEffect(() => {
    if (!ymm.year && !ymm.make && !ymm.model && !ymm.trim && !ymm.drive) {
      setSelectedVehicle(null);
      setIsDisabledSubmit(true);
    }
  }, [ymm.year, ymm.make, ymm.model, ymm.trim, ymm.drive]);

  useEffect(() => {
    setIsDisabledSubmit(
      !isValidDrive || isVehicleDataLoading || isVehicleDataFetching
    );
  }, [isValidDrive, isVehicleDataLoading, isVehicleDataFetching]);

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
      trims &&
      selectedVehicle?.trim &&
      !trims.includes(selectedVehicle.trim)
    ) {
      setSelectedVehicle((prev) => ({
        ...prev,
        trim: defaultTrimValue,
      }));
    }
  }, [trims]);

  useEffect(() => {
    if (drives && selectedVehicle?.drive && !drives.includes(selectedVehicle.drive)) {
      setSelectedVehicle((prev) => ({
        ...prev,
        drive: defaultDriveValue,
      }));
    }
  }, [drives]);

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
      trim: defaultTrimValue,
      drive: defaultDriveValue,
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        year: newYear,
        make: defaultMakeValue,
        model: defaultModelValue,
        trim: defaultTrimValue,
        drive: defaultDriveValue,
        list: {
          makes: [],
          models: [],
          trims: [],
          drives: [],
        },
        vehicleInformation: emptyVehicleInformation,
      })
    );
  };

  const onMakeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newMake = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      make: newMake,
      model: defaultModelValue,
      trim: defaultTrimValue,
      drive: defaultDriveValue,
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        make: newMake,
        model: defaultModelValue,
        trim: defaultTrimValue,
        drive: defaultDriveValue,
        list: {
          models: [],
          trims: [],
          drives: [],
        },
        vehicleInformation: emptyVehicleInformation,
      })
    );
  };

  const onModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newModel = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      model: newModel,
      trim: defaultTrimValue,
      drive: defaultDriveValue,
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        model: newModel,
        trim: defaultTrimValue,
        drive: defaultDriveValue,
        list: {
          trims: [],
          drives: [],
        },
        vehicleInformation: emptyVehicleInformation,
      })
    );
  };

  const onTrimChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const newTrim = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      trim: newTrim,
      drive: defaultDriveValue,
      vehicleInformation: undefined,
    }));
    dispatch(
      setYmm({
        trim: newTrim,
        drive: defaultDriveValue,
        list: {
          drives: [],
        },
        vehicleInformation: emptyVehicleInformation,
      })
    );
  };

  const onDriveChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
    markActiveYmmInstance();
    const value = typeof data === 'string' ? data : data.target.value;
    setSelectedVehicle((prev) => ({
      ...prev,
      drive: value,
    }));
    dispatch(
      setYmm({
        drive: value,
      })
    );
  };

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

  const listData = {
    years: (isYearFetching || isYearLoading) ? [] : (years ?? ymm.list?.years ?? []),
    makes: (effectiveYear && !isMakeLoading && !isMakeFetching) ? (makes ?? ymm.list?.makes ?? []) : [],
    models: (isValidMake && !isModelLoading && !isModelFetching) ? (models ?? ymm.list?.models ?? []) : [],
    trims: (isValidModel && !isTrimLoading && !isTrimFetching) ? (trims ?? ymm.list?.trims ?? []) : [],
    drives: (isValidTrim && !isDriveLoading && !isDriveFetching) ? (drives ?? ymm.list?.drives ?? []) : [],
  };

  return {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isTrimLoading,
    isDriveLoading,
    isYearFetching,
    isMakeFetching,
    isModelFetching,
    isTrimFetching,
    isDriveFetching,
    isYearDisabled: isYearLoading || isYearFetching,
    isMakeDisabled:
      !effectiveYear || isMakeLoading || isMakeFetching || (listData.makes.length ?? 0) === 0,
    isModelDisabled:
      !isValidMake || isModelLoading || isModelFetching || (listData.models.length ?? 0) === 0,
    isTrimDisabled:
      !isValidModel ||
      isTrimLoading || isTrimFetching ||
      (listData.trims.length ?? 0) === 0,
    isDriveDisabled:
      !isValidTrim || isDriveLoading || isDriveFetching || (listData.drives.length ?? 0) === 0,
    shouldShowSubmit: isValidDrive,
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    onSubmit,
    isDisabledSubmit,
    isActive: !ymmId || ymm.activeYmmInstanceId === ymmId,
    ...ymm,
    ...selectedVehicle,
    list: listData,
    year: effectiveYear,
    make: effectiveMake,
    model: effectiveModel,
    trim: effectiveTrim,
    drive: effectiveDrive,
    vehicleInformation:
      selectedVehicle?.vehicleInformation ?? ymm.vehicleInformation,
  };
};

export default useYmm;
