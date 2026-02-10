"use client"
import React, { useContext } from 'react';
import { WheelContext } from './context/WheelProvider';
import QuantityInputBox from '@/components/ui/quantity-input-box/quantity-input-box';

type QuantityInputProps = {
    name: string;
    inventoryAvailable: number,
    id: string;
    className?: string;
    [props: string]: any
}

const WheelQuantityInput = ({ name, inventoryAvailable, id, className = "", ...props }: QuantityInputProps) => {
    const quantityStep = 1;
    const maxQuantity = Math.floor(inventoryAvailable / quantityStep) * quantityStep;
    const { quantity, setQuantity } = useContext(WheelContext);

    const updateInputQuantityByBtn = (action: "increase" | "decrease") => {
        if (action === 'increase') {
            setQuantity(
                maxQuantity >= (quantity + quantityStep) ? (quantity + quantityStep) : maxQuantity
            );
        } else if (action === 'decrease') {
            setQuantity((quantity - quantityStep) >= quantityStep ? quantity - quantityStep : quantityStep);
        } else {
            throw new Error("incorrect action in updateInputQuantityByBtn")
        }
    }

    return (
        <QuantityInputBox
            className={className}
            id={id}
            inputName={name}
            inputValue={quantity}
            maxInputValue={maxQuantity}
            onDecrease={() => updateInputQuantityByBtn('decrease')}
            onIncrease={() => updateInputQuantityByBtn('increase')}
            onInputChange={(e) => setQuantity(Number(e.target.value))}
            quantityStep={quantityStep}
        />
    );
};

export default WheelQuantityInput;
