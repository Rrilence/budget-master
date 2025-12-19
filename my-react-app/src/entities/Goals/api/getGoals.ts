import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export const getGoals = async(user: User) => {

    const { data, error  } = await supabase
    .from('goals')
    .select('id, user_id, name, totalAmount, amount, date, icon')
    if (error) {throw error}
        if(data) {
            const dataUser = data.filter((item) => item.user_id === user.id)
            return dataUser;
        } else {return []}
}