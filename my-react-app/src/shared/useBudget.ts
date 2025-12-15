import { useMemo } from "react";
import type { InfoBudget, InfoExpense } from "./types";
import { dateValidate } from "./validation";

interface ExpensesByCategory {
    [budgetId: string]: { [category: string]: number };
}

const useBudget = (budgets: InfoBudget[], expenses: InfoExpense[]): ExpensesByCategory => {
    const expensesByCategory = useMemo(() => {
            const result: ExpensesByCategory = {};
    
            budgets.forEach(budget => {
                if (!budget.id) return;
                const budgetStartDate = dateValidate(budget.dateStart); 
                const budgetEndDate = dateValidate(budget.dateEnd);
                if(budget.id) {
                    if (!result[budget.id]) { result[budget.id] = { [budget.category]: 0 };
                    }
                    result[budget.id][budget.category] = 0;
        
                    expenses.forEach(expense => {
                        const expenseDate = dateValidate(expense.date);
                        
                         if(expense.category === budget.category
                            && expenseDate >= budgetStartDate 
                            && expenseDate <= budgetEndDate) {
                        result[budget.id!][budget.category] += expense.amount;
                         }
                    })
                }
            })
            return result
        }, [budgets, expenses])
        return expensesByCategory;
}

export default useBudget;