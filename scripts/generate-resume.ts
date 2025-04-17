import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { resumeData } from "../src/resume.data.ts";
import { ResumeZodSchema } from "../src/resume.schema.ts";
import { ZodError } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
const outputFilePath = path.join(__dirname, "resume.json");

async function generateResumeJson() {
  try {
    console.log("Validating resume data...");
    const validatedData = ResumeZodSchema.parse(resumeData);
    console.log("Resume data validation successful.");

    const jsonString = JSON.stringify(validatedData, null, 2);

    await fs.writeFile(outputFilePath, jsonString, "utf8");
    console.log(`Successfully generated ${path.basename(outputFilePath)}`);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Resume data validation failed:");
      console.error(JSON.stringify(error.errors, null, 2));
    } else {
      console.error("An unexpected error occurred during generation:", error);
    }
    process.exit(1);
  }
}

generateResumeJson();
