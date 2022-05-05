import styles from './IngredientPage.module.css';
import { ingredientsSelector, } from '../../services/slice/ingredients';
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from '../../components/IngredientDetails/IngredientDetails';

export const IngredientPage = () => {
  const { id }: { id: string } = useParams();
  const { ingredients } = useSelector(ingredientsSelector);
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
