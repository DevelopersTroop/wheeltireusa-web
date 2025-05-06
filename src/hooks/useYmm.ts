"use client"
import { getBodyTypes, getMakes, getModels, getSubModels, getVehicleData, getYears } from "@/lib/driver-right-api";
import { setMainFilter, submitMainFilter } from "@/redux/features/mainFilterSlice";
import { RootState } from "@/redux/store";
import { TMainFilter } from "@/types/main-filter";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useYmm = () => {
    const router = useRouter();
    const dispatch = useDispatch();


    const [isLoading, setIsLoading] = useState({
        year: true,
        make: true,
        model: true,
        bodyType: true,
        subModel: true,
        vehicleData: true
    })

    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const ymm = useSelector((state: RootState) => state.mainFilter) as TMainFilter

    // fetch year
    useEffect(() => {
        if (isLoading.year === true && ymm.list?.years?.length === 0 && ymm.year === "") {
            getYears().then((years) => {
                dispatch(setMainFilter({ list: { years } }))
            })
                .finally(() => {
                    setIsLoading({
                        year: false,
                        make: true,
                        model: true,
                        bodyType: true,
                        subModel: true,
                        vehicleData: true
                    })
                })
        }
    }, [isLoading.year]);

    // fetch makes
    useEffect(() => {
        if (isLoading.make === true && ymm.year !== "") {
            getMakes(ymm.year).then((makes) => {
                dispatch(setMainFilter({ list: { makes } }))
            })
                .finally(() => {
                    if (ymm.year) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: true,
                            bodyType: true,
                            subModel: true,
                            vehicleData: true
                        })
                    }
                })
        }
    }, [JSON.stringify(ymm.year), isLoading.make]);

    // fetch model
    useEffect(() => {
        if (isLoading.model === true && ymm.year !== "" && ymm.make !== "") {
            getModels(ymm.year, ymm.make).then((models) => {
                dispatch(setMainFilter({ list: { models } }))
            })
                .finally(() => {
                    if (ymm.make) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: true,
                            subModel: true,
                            vehicleData: true
                        })
                    }
                })
        }
    }, [JSON.stringify(ymm.make), isLoading.model])

    // fetch getBodyTypes
    useEffect(() => {
        if (isLoading.bodyType === true && ymm.year !== "" && ymm.make !== "" && ymm.model !== "") {
            getBodyTypes(ymm.year, ymm.make, ymm.model).then((bodyTypes) => {
                dispatch(setMainFilter({ list: { bodyTypes } }))
            })
                .finally(() => {
                    if (ymm.model) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: true,
                            vehicleData: true
                        })
                    }

                })
        }
    }, [JSON.stringify(ymm.model), isLoading.bodyType])

    // get getSubModels
    useEffect(() => {
        if (isLoading.subModel === true && ymm.year !== "" && ymm.make !== "" && ymm.model !== "" && ymm.bodyType !== "") {
            getSubModels(ymm.year, ymm.make, ymm.model, ymm.bodyType).then((subModels) => {
                dispatch(setMainFilter({ list: { subModels } }))
            })
                .finally(() => {
                    if (ymm.bodyType !== "") {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: true
                        })
                    }

                })
        }

    }, [JSON.stringify(ymm.bodyType), isLoading.subModel]);

    //get getVehicleData
    useEffect(() => {
        if (ymm.subModel.DRChassisID !== "" && ymm.subModel.DRModelID !== "") {
            setIsDisabledSubmit(true);
            getVehicleData(ymm.subModel?.DRModelID ?? "", ymm.subModel?.DRChassisID ?? "").then((vehicleInformation) => {
                dispatch(setMainFilter({ vehicleInformation }));
            })
        }
    }, [JSON.stringify(ymm.subModel)]);

    // enable submit button when vehicleData (bolt pattern) is available
    useEffect(() => {
        if (ymm.vehicleInformation.boltPattern !== "") {
            setIsDisabledSubmit(false);
            setIsLoading({
                year: false,
                make: false,
                model: false,
                bodyType: false,
                subModel: false,
                vehicleData: false
            })
        }
    }, [JSON.stringify(ymm.vehicleInformation)])



    const onYearChange = (value: string) => {
        dispatch(setMainFilter({ year: value, make: "", model: "", bodyType: "", subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
        // empty all other list
        dispatch(setMainFilter({
            list: {
                makes: [],
                models: [],
                bodyTypes: [],
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))

        // make all other loading to true
        setIsLoading({
            year: false,
            make: true,
            model: true,
            bodyType: true,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);
    }
    const onMakeChange = (value: string) => {
        dispatch(setMainFilter({ make: value, model: "", bodyType: "", subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
        // empty all other list
        dispatch(setMainFilter({
            list: {
                models: [],
                bodyTypes: [],
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))

        // make all other loading to true
        setIsLoading({
            year: false,
            make: false,
            model: true,
            bodyType: true,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);
    }
    const onModelChange = (value: string) => {
        dispatch(setMainFilter({ model: value, bodyType: "", subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
        // empty all other list
        dispatch(setMainFilter({
            list: {
                bodyTypes: [],
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))

        // make all other loading to true
        setIsLoading({
            year: false,
            make: false,
            model: false,
            bodyType: true,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);

    }
    const onBodyTypeChange = (value: string) => {
        dispatch(setMainFilter({ bodyType: value, subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
        // empty all other list
        dispatch(setMainFilter({
            list: {
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))
        // make all other loading to true
        setIsLoading({
            year: false,
            make: false,
            model: false,
            bodyType: false,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);
    }
    const onSubModelChange = (value: string) => {
        if (ymm.list?.subModels) {
            dispatch(setMainFilter({ subModel: ymm.list.subModels.find(subModel => subModel.SubModel === value) as typeof ymm.list.subModels[0] }));
        }
    }


    const onSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        if (ymm.subModel.DRChassisID && !isLoading.vehicleData) {
            dispatch(submitMainFilter({}));
            router.push("/collections/product-category/wheels?vehicle=selectedVehicleInformation");

        }
    }


    return {
        isYearLoading: isLoading.year,
        isMakeLoading: ymm.year && !isLoading.year && isLoading.make,
        isModelLoading: ymm.make && !isLoading.make && isLoading.model,
        isBodyTypeLoading: ymm.model && !isLoading.model && isLoading.bodyType,
        isSubmodelLoading: ymm.bodyType && !isLoading.bodyType && isLoading.subModel,
        shouldShowSubmit: ymm.subModel.DRChassisID && !isLoading.vehicleData || !(ymm.subModel.DRChassisID),
        onYearChange,
        onMakeChange,
        onModelChange,
        onBodyTypeChange,
        onSubModelChange,
        onSubmit,
        isDisabledSubmit,
        ...ymm
    }

}

export default useYmm;