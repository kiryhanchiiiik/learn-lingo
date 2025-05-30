import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../redux/favorites/favoritesSlice";
import { selectUser } from "../../redux/auth/selectors";

const InitFavorites = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.email) {
      const favStr = localStorage.getItem(`favorites_${user.email}`);
      if (favStr) {
        try {
          const favItems = JSON.parse(favStr);
          dispatch(setFavorites({ items: favItems }));
        } catch (e) {
          console.error("Failed to parse favorites from localStorage", e);
          dispatch(setFavorites({ items: [] }));
        }
      } else {
        dispatch(setFavorites({ items: [] }));
      }
    } else {
      dispatch(setFavorites({ items: [] }));
    }
  }, [user, dispatch]);

  return null;
};

export default InitFavorites;
