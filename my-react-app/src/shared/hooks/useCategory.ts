import { useSelector } from "react-redux";
import { selectData } from "../../entities/setting-slice";
import { useMemo } from "react";

const useCategory = () => {
    const setting = useSelector(selectData);
  
    const settingCategory = useMemo(() => {
        return (setting?.category || []).map(category => ({
        type: category,
        value: 0
        }));
    }, [setting?.category]);
    
    return settingCategory;
}


export default useCategory