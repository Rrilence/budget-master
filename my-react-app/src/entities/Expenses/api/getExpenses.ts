import { supabase } from "../../lib/supabase";

export const getExpenses = async() => {
    const { data, error  } = await supabase
      .from('expenses')
      .select('user_id, name, category, amount, date')
      if (error) {throw error}
                if(data) {
                    return data;
                }
}