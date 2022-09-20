import styles from './IngredientPage.module.css';
import { ingredientsSelector, } from '../../services/slice/ingredients';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from '../../components/IngredientDetails/IngredientDetails';

export const IngredientPage = () => {
  const { id }: { id: string } = useParams();
  const { ingredients } = useAppSelector(ingredientsSelector);
  const currentIngredient = useMemo(
    () => ingredients.find((el: { _id: string; }) => el._id === id),
    [ingredients, id]
  );

  return (
    <>
      {currentIngredient && (
        <>
          <div className={styles.main}>
            <IngredientDetails />
          </div>
        </>
      )}
    </>
  );
};


export default IngredientPage;
