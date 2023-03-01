import { Configuration, OpenAIApi } from "openai";

const runtimeConfig = useRuntimeConfig();
const configuration = new Configuration({
    apiKey: runtimeConfig.openaiKey,
})

const openai = new OpenAIApi(configuration);

const prompt = (resume) => {
    return `
    Consider the following resume of an applicant:\n\"${resume}\"\n\nBased on this resume please extract the following data about the applicant. \n- His Linkedin URL\n- His email address\n- His address\n- A 30-word description of the applicant, summarizing his most important skills and achievements, his previous work experience\n- A slogan of the person (What he is and his experience)\n- Keywords about the person and the most valuable skills\n- His special certifications and awards\n- His previous work places/companies\n\nThe result should be formatted as a JSON Object. In case there is no specific information related to one of these properties or something is unclear and the result not 100% correct, the value of that property should be equal to 404, formatted as a number. Here is an example of a possible response:\n    {\n        \"email\": \"joe@doe.com\",\n        \"linkedin\": \"https://domain.com/joe-doe\",\n        \"address\": \"USA, New York\",\n        \"slogan\": \"Senior Front-End Developer with 5 years of experience\",\n        \"description\": \"30 word description\",\n        \"keywords\": [\"React.js\", \"Communicative\", \"Web Design\"],\n        \"certifications\": [\"Frontend Developer Certification\", \"Public Speaking Certification\", \"Bachelor Degree in Computer Science\"],\n        \"previous_work_experience\": [\"Google\", \"Amazon\", \"Tesla\"],\n    }\n
    `
}

export default defineEventHandler( async (event) => {
    const resume = await readBody(event)

    try {
        const evaluation = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt(resume),
            temperature: 0.5,
            max_tokens: 512,
            top_p: 0.90,
        })
        return {
            result: evaluation.data.choices[0].text,
            error: 'none',
        }
    } catch(error) {
        return {
            error: error.message,
        }
    }
    
})