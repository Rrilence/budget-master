import { useDispatch, } from "react-redux";
import { setWindowWidth } from "../../entities/windoWidth-slice";
import { useEffect } from "react";

export const useWindowSize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
};