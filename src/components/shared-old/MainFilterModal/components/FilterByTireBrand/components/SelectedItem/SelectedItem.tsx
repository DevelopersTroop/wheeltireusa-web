import BrickBox from '../../../BrickBox/BrickBox';
import useSelectedItem from './useSelectedItem';
const SelectedItem = () => {
  const { brand, clearBrand } = useSelectedItem();
  return (
    <div className="flex gap-2 px-6 order-2">
      {brand && (
        <BrickBox
          checked={true}
          filterType="byTireBrand"
          fieldName="brand"
          text={brand}
          isDismissable={true}
          onClick={clearBrand}
        />
      )}
    </div>
  );
};

export default SelectedItem;
