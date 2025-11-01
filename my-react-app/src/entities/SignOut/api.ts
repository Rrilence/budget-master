import { supabase } from "../lib/supabase"


export async function logoutUser() {
 try {
   const { error } = await supabase.auth.signOut();
   if (error) throw error
   return null;
 } catch (error) {
   console.error('Ошибка при выходе', error);
return error; 
 }
}