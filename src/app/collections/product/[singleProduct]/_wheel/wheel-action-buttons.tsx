'use client';

import store, { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TWheelProduct } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';
import React, { useContext } from 'react';
import wait from 'wait';
import WheelQuantityInput from './wheel-quantity-input';
import { WheelContext } from './context/WheelProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { addPackage } from '@/redux/features/packageSlice';
import { triggerGaAddToCart } from '@/utils/analytics';
import { addToCart } from '@/redux/features/cartSlice';
import { CartData } from '@/types/cart';
import { useCartHook } from '@/hooks/useCartHook';
import CompareButton from '@/components/shared/CompareButton/CompareButton';

const WheelActionButtons = ({ product }: { product: TWheelProduct }) => {
    const searchParams = useSearchParams();
    const cartPackage = searchParams.get('cartPackage') as string;
    const packages = useTypedSelector((state) => state.persisted.package);
    const dispatch = useAppDispatch();
    const { quantity } = useContext(WheelContext);
    const { setOpen } = useCartHook();

    const tire = packages[cartPackage]?.tire;

    const router = useRouter();

    const addProductToCart = async (meta?: any) => {
        triggerGaAddToCart(product, quantity);
        const data = await new Promise<CartData>((resolve, reject) => {
            try {
                const packageId = uuidv4();
                const cartSerial = uuidv4();
                const metaData = meta || {};
                dispatch(
                    addToCart({
                        ...product,
                        cartPackage: packageId,
                        cartSerial: cartSerial,
                        quantity: quantity,
                        metaData,
                    })
                );
                setTimeout(() => {
                    const updatedProducts = store.getState().persisted.cart.products;
                    const addedProduct = Object.values(updatedProducts).find(
                        (p) =>
                            p.id === product.id &&
                            JSON.stringify(p.metaData) === JSON.stringify(metaData)
                    );
                    resolve({
                        cartSerial: addedProduct?.cartSerial || cartSerial,
                        cartPackage: addedProduct?.cartPackage || packageId,
                    });
                }, 1000);
            } catch (error) {
                reject(error);
            }
        });
        return data;
    };

    const [addToCartText, setAddToCartText] = React.useState('Buy Wheels Only');

    const addTires = () => {
        new Promise<{ cartPackage: string }>((res) => {
            const cartPackage = uuidv4();
            dispatch(
                addPackage({
                    packageId: cartPackage,
                    wheel: {
                        ...product,
                        cartPackage,
                    },
                })
            );
            res({ cartPackage });
        }).then((res) => {
            router.push(
                `/collections/product-category/tires?wheelDiameter=${product.diameter}&cartPackage=${res.cartPackage}`
            );
        });
    };

    const addWheelsToPackage = () => {
        new Promise<{ cartPackage: string }>((res) => {
            dispatch(
                addPackage({
                    packageId: cartPackage,
                    wheel: {
                        ...product,
                        cartPackage,
                    },
                })
            );
            res({ cartPackage });
        }).then((res) => {
            router.push(`/wheel-and-tire-package?cartPackage=${res.cartPackage}`);
        });
    };

    return (
        <>
            <div className="flex flex-col justify-center gap-4">
                <div className="max-w-52">
                    <WheelQuantityInput
                        product={product}
                        inventoryAvailable={20}
                        name={'quantity'}
                        id={'quantity'}
                    />
                </div>
                {tire?.id ? (
                    <button
                        onClick={addWheelsToPackage}
                        className={'w-full rounded py-1 outline outline-primary'}
                    >
                        Add Wheels to your package
                    </button>
                ) : null}
                {tire?.id ? null : (
                    <button
                        onClick={addTires}
                        className={'bg-primary py-3 text-white rounded text-xl w-full'}
                    >
                        Add Tires & Save More !
                    </button>
                )}
            </div>
            <div className="mt-4 flex flex-col gap-3">
                <button
                    onClick={() => {
                        wait(400).then(() => {
                            addProductToCart();
                            setAddToCartText('Loading..');
                            setOpen();
                        });
                    }}
                    className={' py-1 rounded outline outline-primary w-full'}
                >
                    {addToCartText}
                </button>
                <CompareButton product={product} variant="outline" />
            </div>
        </>
    );
};

export default WheelActionButtons;
