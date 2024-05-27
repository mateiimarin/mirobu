import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { openAiApiKey } = useRuntimeConfig(event);
    const openai = new OpenAI({
        apiKey: openAiApiKey,
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `
                    You are a Human Resources specialist tasked with evaluating job applicants. Given a resume and a set of job requirements, you should:

                    1. Rate the applicant's suitability for the job on a scale of 1 to 10.
                    2. Extract the following details:
                    - LinkedIn URL
                    - Email address
                    - Education
                    - Address
                    - A 30-word summary of the applicant's key skills, achievements, and work experience
                    - A slogan capturing the applicant's essence and experience (maximum 9 words)
                    - Keywords highlighting the applicant's most valuable skills
                    - Special certifications and awards
                    - Previous workplaces/companies

                    **The result must be formatted purely as a JavaScript Object (JS Object) and presented without any additional text, comments, or code declarations (Do not include 'json' or 'javascript' introduction in your response either). This is crucial to ensure it can be parsed by JSON.parse().** If any property is unclear or unavailable, set its value to 404 (as a number).

                    This is your response template:

                    {
                        "name": "",
                        "score": 3,
                        "email": "",
                        "linkedin": "",
                        "education": [
                            {
                                "institution": "",
                                "timespan": "",
                            }
                        ],
                        "address": "",
                        "slogan": "",
                        "description": "",
                        "keywords": [],
                        "certifications": [],
                        "work_experience": [
                            {
                                "institution": "",
                                "timespan": "",
                            }
                        ]
                    }

                    `
                },
                {
                    role: "assistant",
                    content: `                   
                    Here is the resume:
                    ${body.resume}

                    Here are the job requirements:
                    ${body.requirements}
                    `
                }
            ],
            temperature: 1,
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(response.choices[0].message.content)
        return JSON.parse(response.choices[0].message.content);
    }
    catch (error) {
        return error;
    }
})
