import {
  closeMainFilterModal,
  setMainFilter,
} from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const useFilterByVehicle = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  const ref = useRef<HTMLDivElement>(null);

  // scroll to top when main filter state changes
  useEffect(() => {
    if (ref?.current) {
      const scrollArea = ref.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollArea) {
        scrollArea.scrollTo({ left: 0, top: 0, behavior: 'instant' });
      }
    }
  }, [JSON.stringify(mainFilterState.filters.byVehicle.current), ref?.current]);

  const selectedYear = mainFilterState.filters.byVehicle.current.year;
  const selectedMake = mainFilterState.filters.byVehicle.current.make;
  const selectedModel = mainFilterState.filters.byVehicle.current.model;
  const selectedFrontTireSize =
    mainFilterState.filters.byVehicle.current.frontTireSize;
  const selectedRearTireSize =
    mainFilterState.filters.byVehicle.current.rearTireSize;
  const selectedZipCode = mainFilterState.zipCode;
  const currentBodyType = mainFilterState.filters.byVehicle.current.bodyType;
  const currentSubModel = mainFilterState.filters.byVehicle.current.subModel;

  const allTireSizes =
    mainFilterState.filters.byVehicle.current.vehicleInformation.tireSizes;

  useEffect(() => {
    if (
      currentBodyType &&
      currentSubModel.DRModelID &&
      currentSubModel.DRChassisID
    ) {
      fetch(
        `https://api.driverightdata.com/eu/api/vehicle-info/GetVehicleDataFromDRD_NA?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&DRDModelID=${currentSubModel.DRModelID}&DRDChassisID=${currentSubModel.DRChassisID}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  current: {
                    vehicleInformation: {
                      supportedWheels: [],
                      boltPattern: data?.DRDChassisReturn_NA?.PCD ?? '',
                      frontRimSize: data?.DRDModelReturn?.RimSize ?? '',
                      rearRimSize:
                        data?.DRDModelReturn?.RimSize_R ||
                        data?.DRDModelReturn?.RimSize,
                      frontCenterBore:
                        data?.DRDChassisReturn_NA?.CenterBore ?? '',
                      rearCenterBore:
                        data?.DRDChassisReturn_NA?.CenterBore_R ||
                        data?.DRDChassisReturn_NA?.CenterBore,
                      maxWheelLoad:
                        data?.DRDChassisReturn_NA?.WheelLoad_Max_Lbs ?? '',
                      tireSizes: [
                        {
                          DRDChassisID:
                            data?.DRDModelReturn?.PrimaryOption?.DRDChassisID ??
                            '',
                          DRModelID:
                            data?.DRDModelReturn?.PrimaryOption?.DRDModelID ??
                            '',
                          factory: {
                            front:
                              data?.DRDModelReturn?.PrimaryOption?.TireSize ??
                              '',
                            rear:
                              data?.DRDModelReturn?.PrimaryOption?.TireSize_R ||
                              data?.DRDModelReturn?.PrimaryOption?.TireSize,
                          },
                        },
                      ],
                    },
                  },
                },
              },
            })
          );
        });
    }
  }, [JSON.stringify(currentSubModel)]);

  const isDisabled =
    !allTireSizes || allTireSizes?.length === 0 || !selectedZipCode;
  const submitFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    router.push(
      `/collections/product-category/tire?frontTireSize=${encodeURIComponent(selectedFrontTireSize ?? '')}&rearTireSize=${encodeURIComponent(selectedRearTireSize ?? '')}`
    );
    dispatch(closeMainFilterModal());
  };
  return {
    year: selectedYear,
    make: selectedMake,
    model: selectedModel,
    bodyType: currentBodyType,
    subModel: currentSubModel,
    frontTireSize: selectedFrontTireSize,
    rearTireSize: selectedRearTireSize,
    allTireSizes,
    isDisabled,
    submitFilter,
    ref,
  };
};

export default useFilterByVehicle;
