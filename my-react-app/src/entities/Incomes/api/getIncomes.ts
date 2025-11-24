import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export const getIncomes = async(user: User) => {

    const { data, error  } = await supabase
      .from('incomes')
      .select('id, user_id, name, amount, date')
      if (error) {throw error}
                if(data) {
                    const dataUser = data.filter((item) => item.user_id === user.id)
                    return dataUser;
                } else {return []}
}