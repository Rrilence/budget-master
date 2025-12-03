import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export const getBudgets = async(user: User) => {

    const { data, error  } = await supabase
      .from('budgets')
      .select('id, user_id, category, amount, dateStart, dateEnd, period')
      if (error) {throw error}
                if(data) {
                    const dataUser = data.filter((item) => item.user_id === user.id)
                    return dataUser;
                } else {return []}
}