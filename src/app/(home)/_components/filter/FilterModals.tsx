"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useYmm from "@/hooks/useYmm";
import { closeMainFilterModal, openMainFilterModal } from "@/redux/features/mainFilterSlice";
import { useDispatch } from "react-redux";

const YmmForm = () => {
    const dispatch = useDispatch();
    const {
        isYearLoading,
        isMakeLoading,
        isModelLoading,
        isBodyTypeLoading,
        isSubmodelLoading,
        shouldShowSubmit,
        list: { years,
            makes,
            models,
            bodyTypes,
            subModels },
        onYearChange,
        onMakeChange,
        onModelChange,
        onBodyTypeChange,
        onSubModelChange,
        onSubmit,
        isDisabledSubmit,
        year, make, model, bodyType, subModel,
        isFilterModalOpen
    } = useYmm();
    
    const handleDialogChange = (isOpen: boolean) => {
        dispatch(openMainFilterModal())
        if (!isOpen) {
            dispatch(closeMainFilterModal());
        }
    };


    return (<>

        <Dialog open={isFilterModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-1/2">
            <DialogTitle>Select your vehicle</DialogTitle>
                <div className="w-full p-4">
                    <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
                        <Select value={year} onValueChange={onYearChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={isYearLoading ? "Loading..." : "Year"} />
                            </SelectTrigger>
                            <SelectContent>
                                {years?.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={make} onValueChange={onMakeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={isMakeLoading ? "Loading..." : "Make"} />
                            </SelectTrigger>
                            <SelectContent>
                                {makes?.map(make => <SelectItem key={make} value={make}>{make}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={model} onValueChange={onModelChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={isModelLoading ? "Loading..." : "Model"} />
                            </SelectTrigger>
                            <SelectContent>
                                {models?.map(model => <SelectItem key={model} value={model}>{model}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={bodyType} onValueChange={onBodyTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Body Type"} />
                            </SelectTrigger>
                            <SelectContent>
                                {bodyTypes?.map(bodyType => <SelectItem key={bodyType} value={bodyType}>{bodyType}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={subModel.SubModel} onValueChange={onSubModelChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Submodel"} />
                            </SelectTrigger>
                            <SelectContent>
                                {subModels?.map(subModel => <SelectItem key={subModel.SubModel} value={subModel.SubModel}>{subModel.SubModel}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="w-full p-4">
                    <Button  
                        onClick={onSubmit} 
                        disabled={isDisabledSubmit || !shouldShowSubmit} 
                        className="w-full"
                        variant="default"
                    >
                        {shouldShowSubmit ? "Submit" : "Loading"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    </>)
}

const FilterModals = () => {

    return (
        <YmmForm />
    );
};

export default FilterModals;