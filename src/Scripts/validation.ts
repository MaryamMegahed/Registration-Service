import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import hashing from '../Scripts/hashing';

//-----------------------check for unique values in database --------------------------------
export function checkUniqueValues(error:any,res:Response):void{
    if (error.code === 'P2002') {                                   // code for unique value errors
      const targetArray = error.meta?.target as string[]; 
      if (targetArray && targetArray.includes('ssn')) {
        res.status(400).json({ error: 'SSN must be unique' });
      }else if (targetArray && targetArray.includes('userName')) {
        res.status(400).json({ error: 'Username must be unique' });
      }else if (targetArray && targetArray.includes('email')) {
        res.status(400).json({ error: 'email must be unique' });
      }else {                                                      // Handle other Prisma known errors
        res.status(400).json({ error: 'Invalid request to the database' });
      }
  }  
}

//-----------------------check for capital letter in password --------------------------------
export function hasCapitalizedCharacter(inputString:string):boolean {
for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === inputString[i].toUpperCase()) {
    return true; // Found a capitalized character
    }
    }
    return false; // No capitalized character found
}

//-----------------------SSN Validation--------------------------------
export function ssnValidation(inputSSN: string) :boolean {
    return /^\d{14}$/.test(inputSSN);
}

//-----------------------Date Format Validation--------------------------------
export function isValidDateFormat(inputDate: string): boolean {
    // const dateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
    const dateFormatPattern = /^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    return dateFormatPattern.test(inputDate);
}


export function handleErrors (error: any, res: Response): void {
  console.error(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    checkUniqueValues(error, res);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // Handle validation errors
    res.status(422).json({ error: 'Validation error in database request' });
  } else if (error.message) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const validateUsertData = async (userData: any) => {
  if (userData.ssn && !ssnValidation(userData.ssn)) {
    throw new Error('SSN is incorrect');
  } 
  else if (userData.dateOfBirth && !isValidDateFormat(userData.dateOfBirth)) {
    throw new Error('Check that you entered the right birthdate and in this format: YYYY-MM-DD');
  } 
  else if (userData.password) {
    // Hash the new password using your hashPassword function
    if(hasCapitalizedCharacter(userData.password)==false){
      throw new Error(' password must has at least one capital letter');
    }
    userData.password = await hashing.hashPassword(userData.password);
  }
};

export default {
  validateUsertData
}