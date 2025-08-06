import { Injectable } from '@angular/core';
import { Profile } from '../../interface/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class Utility {

  parseResumeToJSON(raw: string): Profile | null {
    try {
      // Step 1: Remove the leading "Success :" label and extract JSON block
      const jsonStart = raw.indexOf('{');
      const jsonEnd = raw.lastIndexOf('}');

      if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        throw new Error("Invalid JSON structure");
      }

      const jsonString = raw.slice(jsonStart, jsonEnd + 1);

      // Step 2: Parse the extracted JSON string
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return null;
    }
  }

  parseQuestionToJSON(raw: string): { [key: string]: any } | null {
    try {
      // Case 1: If it's already valid JSON
      if (raw.trim().startsWith('{') && raw.trim().endsWith('}')) {
        return JSON.parse(raw);
      }

      // Case 2: If it's a wrapped message like "Success : {...}"
      const jsonStart = raw.indexOf('{');
      const jsonEnd = raw.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        const jsonString = raw.slice(jsonStart, jsonEnd + 1);
        return JSON.parse(jsonString);
      }

      // Case 3: It's just a plain string — wrap it in an object
      return { text: raw };
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  }



}
