import styles from './IngredientPage.module.css';
import { ingredientsSelector, } from '../../services/slice/ingredients';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from '../../components/IngredientDetails/IngredientDetails';

export const IngredientPage = () => {
    const { id } = useParams();
    const { ingredients } = useSelector(ingredientsSelector);
    const currentIngredient = useMemo(
      () => ingredients.find((el) => el._id === id),
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
