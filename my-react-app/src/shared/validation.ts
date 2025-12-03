
const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LOGIN_REGEXP = /^[a-zA-Z0-9!@#$%&*()_,.?~\\/-]+$/;

const regExpression: RegExp = /^[а-яА-ЯёЁ\s]+$/i;

const dateValidate = (date: string) => {
    const [day, month, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day);
}


export {
    EMAIL_REGEXP, 
    LOGIN_REGEXP,
    regExpression, 
    dateValidate,
    
}