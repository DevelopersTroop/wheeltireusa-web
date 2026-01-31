"use client"
import { setYmm, submitYmm } from "@/redux/features/yearMakeModelSlice";
import { useTypedSelector } from "@/redux/store";
import { getBodyTypes, getMakes, getModels, getSubModels, getVehicleData, getYears } from "@/lib/driver-right-api";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useYmm = (isWheel:boolean = true) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const defaultMakeValue = "__DEFAULT_MAKE__";
    const defaultModelValue = "__DEFAULT_MODEL__";
    const defaultBodyTypeValue = "__DEFAULT_BODYTYPE__";
    const defaultSubModelValue = "__DEFAULT_SUBMODEL__";

    const [selectedVehicle, setSelectedVehicle] = useState<{
        year?: string,
        make?: string,
        model?: string,
        bodyType?: string,
        subModel?: {
            SubModel?: string,
            DRChassisID?: string,
            DRModelID?: string
        },
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
            tireSizes: Record<"front" | "rear", string>[];
            tireSizesList?: string[]
        }
    } | null>(null);

    const [isLoading, setIsLoading] = useState({
        year: false,
        make: false,
        model: false,
        bodyType: false,
        subModel: false,
        vehicleData: false
    })

    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const ymm = useTypedSelector(state => state.yearMakeModel)

    // fetch year
    useEffect(() => {
        if ((!ymm.list?.years || ymm.list.years.length === 0)) {
            setIsLoading(prev => ({ ...prev, year: true }));
            getYears().then((years) => {
                dispatch(setYmm({ list: { years } }))
            })
                .finally(() => {
                    setIsLoading(prev => ({ ...prev, year: false }))
                })
        }
    }, []);

    // fetch makes (only when makes list is empty and year is selected)
    useEffect(() => {
        const effectiveYear = selectedVehicle?.year ?? ymm.year;
        const makesListCount = ymm.list?.makes?.length ?? 0;
        if (effectiveYear && makesListCount === 0) {
            setIsLoading(prev => ({ ...prev, make: true }));
            getMakes(effectiveYear).then((makes) => {
                dispatch(setYmm({ list: { makes } }))
            })
                .finally(() => {
                    setIsLoading(prev => ({ ...prev, make: false }))
                })
        }
    }, [selectedVehicle?.year, ymm.year, ymm.list?.makes?.length]);

    // fetch model (only when models list is empty and make is selected and not default)
    useEffect(() => {
        const effectiveYear = selectedVehicle?.year ?? ymm.year;
        const effectiveMake = selectedVehicle?.make ?? ymm.make;
        const modelsListCount = ymm.list?.models?.length ?? 0;
        const isValidMake = !!effectiveMake && effectiveMake !== defaultMakeValue;
        if (effectiveYear && isValidMake && modelsListCount === 0) {
            setIsLoading(prev => ({ ...prev, model: true }));
            getModels(effectiveYear, effectiveMake).then((models) => {
                dispatch(setYmm({ list: { models } }))
            })
                .finally(() => {
                    setIsLoading(prev => ({ ...prev, model: false }))
                })
        }
    }, [selectedVehicle?.make, ymm.make, ymm.year, ymm.list?.models?.length])

    // fetch body types (only when bodyTypes list is empty and model is selected and not default)
    useEffect(() => {
        const effectiveYear = selectedVehicle?.year ?? ymm.year;
        const effectiveMake = selectedVehicle?.make ?? ymm.make;
        const effectiveModel = selectedVehicle?.model ?? ymm.model;
        const bodyTypesListCount = ymm.list?.bodyTypes?.length ?? 0;
        const isValidModel = !!effectiveModel && effectiveModel !== defaultModelValue;
        if (effectiveYear && effectiveMake && isValidModel && bodyTypesListCount === 0) {
            setIsLoading(prev => ({ ...prev, bodyType: true }));
            getBodyTypes(effectiveYear, effectiveMake, effectiveModel).then((bodyTypes) => {
                dispatch(setYmm({ list: { bodyTypes } }))
            })
                .finally(() => {
                    setIsLoading(prev => ({ ...prev, bodyType: false }))
                })
        }
    }, [selectedVehicle?.model, ymm.model, ymm.make, ymm.year, ymm.list?.bodyTypes?.length])

    // fetch sub models (only when subModels list is empty and bodyType is selected and not default)
    useEffect(() => {
        const effectiveYear = selectedVehicle?.year ?? ymm.year;
        const effectiveMake = selectedVehicle?.make ?? ymm.make;
        const effectiveModel = selectedVehicle?.model ?? ymm.model;
        const effectiveBodyType = selectedVehicle?.bodyType ?? ymm.bodyType;
        const subModelsListCount = ymm.list?.subModels?.length ?? 0;
        const isValidBodyType = !!effectiveBodyType && effectiveBodyType !== defaultBodyTypeValue;
        if (effectiveYear && effectiveMake && effectiveModel && isValidBodyType && subModelsListCount === 0) {
            setIsLoading(prev => ({ ...prev, subModel: true }));
            getSubModels(effectiveYear, effectiveMake, effectiveModel, effectiveBodyType).then((subModels) => {
                dispatch(setYmm({ list: { subModels } }))
            })
                .finally(() => {
                    setIsLoading(prev => ({ ...prev, subModel: false }))
                })
        }
    }, [selectedVehicle?.bodyType, ymm.bodyType, ymm.model, ymm.make, ymm.year, ymm.list?.subModels?.length]);

    //get getVehicleData
    useEffect(() => {
        if (selectedVehicle?.subModel?.DRChassisID && selectedVehicle?.subModel?.DRModelID) {
            setIsDisabledSubmit(true);
            setIsLoading(prev => ({ ...prev, vehicleData: true }));
            getVehicleData(selectedVehicle?.subModel?.DRModelID ?? "", selectedVehicle?.subModel?.DRChassisID ?? "").then((vehicleInformation) => {
                setSelectedVehicle((prev) => ({
                    ...prev,
                    vehicleInformation: vehicleInformation
                }))
            }).finally(() => {
                setIsLoading(prev => ({ ...prev, vehicleData: false }));
            })
        }
    }, [selectedVehicle?.subModel]);

    // enable submit button when vehicleData (bolt pattern) is available
    useEffect(() => {
        if (selectedVehicle?.vehicleInformation?.boltPattern) {
            setIsDisabledSubmit(false);
        } else {
            setIsDisabledSubmit(true);
        }
    }, [selectedVehicle?.vehicleInformation])

    // ensure invalid selections are cleared when lists update
    useEffect(() => {
        const makes = ymm.list?.makes ?? [];
        if (selectedVehicle?.make && !makes.includes(selectedVehicle.make)) {
            setSelectedVehicle(prev => ({ ...prev, make: undefined }));
        }
    }, [JSON.stringify(ymm.list?.makes)]);

    useEffect(() => {
        const models = ymm.list?.models ?? [];
        if (selectedVehicle?.model && !models.includes(selectedVehicle.model)) {
            setSelectedVehicle(prev => ({ ...prev, model: defaultModelValue }));
        }
    }, [JSON.stringify(ymm.list?.models)]);

    useEffect(() => {
        const bodyTypes = ymm.list?.bodyTypes ?? [];
        if (selectedVehicle?.bodyType && !bodyTypes.includes(selectedVehicle.bodyType)) {
            setSelectedVehicle(prev => ({ ...prev, bodyType: defaultBodyTypeValue }));
        }
    }, [JSON.stringify(ymm.list?.bodyTypes)]);

    useEffect(() => {
        const subModels = ymm.list?.subModels ?? [];
        const hasSubModel = !!selectedVehicle?.subModel?.SubModel;
        const exists = hasSubModel ? subModels.some(sm => sm.SubModel === selectedVehicle?.subModel?.SubModel) : false;
        if (hasSubModel && !exists) {
            setSelectedVehicle(prev => ({ ...prev, subModel: { SubModel: defaultSubModelValue } }));
        }
    }, [JSON.stringify(ymm.list?.subModels)]);



    const onYearChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        const newYear = typeof data === 'string' ? data : data.target.value;
        setSelectedVehicle((prev) => ({
            ...prev,
            year: newYear,
            make: defaultMakeValue,
            model: defaultModelValue,
            bodyType: defaultBodyTypeValue,
            subModel: { SubModel: defaultSubModelValue },
            vehicleInformation: undefined
        }))
        // empty all other list
        dispatch(setYmm({
            year: newYear,
            make: defaultMakeValue,
            model: defaultModelValue,
            bodyType: defaultBodyTypeValue,
            subModel: { SubModel: defaultSubModelValue, DRChassisID: "", DRModelID: "" },
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

        setIsDisabledSubmit(true);
    }
    const onMakeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        const newMake = typeof data === 'string' ? data : data.target.value;
        setSelectedVehicle((prev) => ({
            ...prev,
            make: newMake,
            model: defaultModelValue,
            bodyType: defaultBodyTypeValue,
            subModel: { SubModel: defaultSubModelValue },
            vehicleInformation: undefined
        }))
        // empty all other list
        dispatch(setYmm({
            make: newMake,
            model: defaultModelValue,
            bodyType: defaultBodyTypeValue,
            subModel: { SubModel: defaultSubModelValue, DRChassisID: "", DRModelID: "" },
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

        setIsDisabledSubmit(true);
    }
    const onModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        const newModel = typeof data === 'string' ? data : data.target.value;
        setSelectedVehicle((prev) => ({
            ...prev,
            model: newModel,
            bodyType: defaultBodyTypeValue,
            subModel: { SubModel: defaultSubModelValue },
            vehicleInformation: undefined
        }))
        // empty all other list
        dispatch(setYmm({
            model: newModel,
            bodyType: defaultBodyTypeValue,
            subModel: { SubModel: defaultSubModelValue, DRChassisID: "", DRModelID: "" },
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

        setIsDisabledSubmit(true);

    }
    const onBodyTypeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        const newBodyType = typeof data === 'string' ? data : data.target.value;
        setSelectedVehicle((prev) => ({
            ...prev,
            bodyType: newBodyType,
            subModel: { SubModel: defaultSubModelValue },
            vehicleInformation: undefined
        }))
        // empty all other list
        dispatch(setYmm({
            bodyType: newBodyType,
            subModel: { SubModel: defaultSubModelValue, DRChassisID: "", DRModelID: "" },
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
        setIsDisabledSubmit(true);
    }
    const onSubModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        const value = typeof data === 'string' ? data : data.target.value;
        if (ymm.list?.subModels) {
            setSelectedVehicle((prev) => ({
                ...prev,
                subModel: ymm.list.subModels?.find(subModel => subModel.SubModel === value) as typeof ymm.list.subModels[0]
            }))
        }
    }


    const onSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        if(!isWheel && selectedVehicle?.vehicleInformation){
            selectedVehicle.vehicleInformation.tireSizesList = Array.from(new Set(Object.values(selectedVehicle?.vehicleInformation?.tireSizes ?? {}).flatMap((sizes: Record<"front" | "rear", string>) => [sizes.front.replace(/(\/\d+)[A-Z]+(\d+)/, '$1-$2'), sizes.rear.replace(/(\/\d+)[A-Z]+(\d+)/, '$1-$2')])))
        }
        const vehicleInformation = isWheel ? { ...(selectedVehicle?.vehicleInformation ?? {}), tireSizes: [] } : { ...(selectedVehicle?.vehicleInformation ?? {}), supportedWheels: [] }
        dispatch(setYmm({
            year: selectedVehicle?.year ?? ymm.year,
            make: selectedVehicle?.make ?? ymm.make,
            model: selectedVehicle?.model ?? ymm.model,
            bodyType: selectedVehicle?.bodyType ?? ymm.bodyType,
            subModel: selectedVehicle?.subModel ?? ymm.subModel,
            vehicleInformation
        }))
        if (selectedVehicle?.subModel?.DRChassisID && !isLoading.vehicleData) {
            dispatch(submitYmm({}));
            if(isWheel){
                router.push("/collections/product-category/wheels?vehicle=selectedVehicleInformation");
            } else {
                router.push("/collections/product-category/tires?tire_size="+selectedVehicle?.vehicleInformation?.tireSizesList?.join(','));
            }
        }
    }


    return {
        isYearLoading: isLoading.year,
        isMakeLoading: isLoading.make,
        isModelLoading: isLoading.model,
        isBodyTypeLoading: isLoading.bodyType,
        isSubmodelLoading: isLoading.subModel,
        isYearDisabled: isLoading.year,
        isMakeDisabled:
            !(selectedVehicle?.year ?? ymm.year) ||
            isLoading.make ||
            ((ymm.list?.makes?.length ?? 0) === 0),
        isModelDisabled:
            !(selectedVehicle?.make ?? ymm.make) ||
            isLoading.model ||
            ((ymm.list?.models?.length ?? 0) === 0),
        isBodyTypeDisabled:
            !(selectedVehicle?.model ?? ymm.model) ||
            isLoading.bodyType ||
            ((ymm.list?.bodyTypes?.length ?? 0) === 0),
        isSubmodelDisabled:
            !(selectedVehicle?.bodyType ?? ymm.bodyType) ||
            isLoading.subModel ||
            ((ymm.list?.subModels?.length ?? 0) === 0),
        shouldShowSubmit: selectedVehicle?.subModel?.DRChassisID && !isLoading.vehicleData || !Boolean(selectedVehicle?.subModel?.DRChassisID),
        onYearChange,
        onMakeChange,
        onModelChange,
        onBodyTypeChange,
        onSubModelChange,
        onSubmit,
        isDisabledSubmit,
        ...ymm,
        ...selectedVehicle
    }

}

export default useYmm;
