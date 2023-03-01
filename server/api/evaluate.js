import { Configuration, OpenAIApi } from "openai";

const runtimeConfig = useRuntimeConfig();
const configuration = new Configuration({
    apiKey: runtimeConfig.openaiKey,
})

const openai = new OpenAIApi(configuration);

const prompt = (application) => {
    return `
    A person wants to apply for the following job:\nThese are the job description and requirements:\n\"${application.campaign.description}\n ${application.campaign.requirements}"\n\nThe person who applies for the job has the following resume:\nAPPLICANT'S RESUME\n\"${application.resume}"\n\nYou are an intelligent job application evaluator. Considering the job's requirements and industry, on a scale from one to ten how suitable is this applicant for the described job? The result should be expressed as a single number.\n
    `
}

export default defineEventHandler( async (event) => {
    const application = await readBody(event)

    try {
        const evaluation = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt(application),
            temperature: 0.15,
            max_tokens: 256,
            top_p: 0.20,
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