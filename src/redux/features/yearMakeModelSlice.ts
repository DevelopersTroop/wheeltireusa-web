"use client";
import { TYmm } from "@/types/ymm";
import { createSlice } from "@reduxjs/toolkit";


const initialState: TYmm = {
    list: {
        years: [],
        makes: [],
        models: [],
        bodyTypes: [],
        subModels: []
    },
    year: "",
    make: "",
    model: "",
    bodyType: "",
    subModel: {
        SubModel: "",
        DRChassisID: "",
        DRModelID: ""
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
    },
    submitYmm: {}
}
const yearMakeModelSlice = createSlice({
    name: "yearMakeModel",
    initialState,
    reducers: {
        setYmm: (state, action: { payload: Partial<TYmm> }) => {
            return {
                ...state,
                ...action.payload,
                vehicleInformation: {
                    ...state.vehicleInformation,
                    ...(action.payload?.vehicleInformation ?? {})
                },
                list: {
                    ...state.list,
                    ...(action.payload?.list ?? {})
                },
                subModel: {
                    ...state.subModel,
                    ...(action.payload?.subModel ?? {})
                }
            }
        },
        clearYearMakeModel: (state) => {
            state = initialState
        },
        submitYmm: (state, action: { payload: object }) => {
            state.submitYmm = action.payload
        }
    }
});

export default yearMakeModelSlice.reducer;
export const { setYmm, clearYearMakeModel, submitYmm } = yearMakeModelSlice.actions;