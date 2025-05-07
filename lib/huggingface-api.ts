/* eslint-disable @typescript-eslint/no-explicit-any */

// const HUGGINGFACE_API_URL =
// 	"https://api-inference.huggingface.co/models/t5-base";

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_MODEL = "qwen/qwen2.5-vl-3b-instruct:free";

interface MetadataOptimizationResult {
	title: string;
	subtitle: string;
	description: string;
}

export async function optimizeAppMetadata(
	currentTitle: string,
	currentSubtitle: string,
	currentDescription: string,
	category: string
): Promise<MetadataOptimizationResult> {
	try {
		// 		const prompt = `
		// I need to optimize an iOS app's metadata for better App Store rankings.

		// App Category: ${category}
		// Current Title: ${currentTitle}
		// Current Subtitle: ${currentSubtitle}
		// Current Description:
		// ${currentDescription}

		// Please suggest an improved title (max 30 characters), subtitle (max 30 characters), and description (max 4000 characters) that would help this iOS app rank higher in the App Store. Focus on relevant keywords, clarity, and appeal to users. Format your response as JSON with "title", "subtitle", and "description" fields.
		// `;

		// const response = await fetch(HUGGINGFACE_API_URL, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN}`,
		// 	},
		// 	body: JSON.stringify({
		// 		inputs: prompt,
		// 		parameters: {
		// 			max_length: 4096,
		// 			temperature: 0.7,
		// 		},
		// 	}),
		// });
		const response = await fetch(OPENROUTER_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${OPENROUTER_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: OPENROUTER_API_MODEL,
				messages: [
					{
						role: "system",
						content: "You are a professional ios apps metedata optimizer.",
					},
					{
						role: "user",
						content: `I need to optimize an iOS app's metadata for better App Store rankings.
		App Category: ${category}
		Current Title: ${currentTitle}
		Current Subtitle: ${currentSubtitle}
		Current Description:
		${currentDescription}.
		Please suggest an improved title (max 30 characters), subtitle (max 30 characters), and description (max 4000 characters) that would help this iOS app rank higher in the App Store. Focus on relevant keywords, clarity, and appeal to users. Format your response as an object with "title", "subtitle", and "description" fields.`,
					},
				],
			}),
		});

		const data = await response.json();
		// console.log(data.choices[0].message.content);

		// The API might return a string that contains JSON
		const result: MetadataOptimizationResult = JSON.parse(
			data.choices[0].message.content
		);
		console.log("Parsed result:", result);

		return {
			title: result?.title,
			subtitle: result?.subtitle,
			description: result?.description,
		};
	} catch (error) {
		console.error("Error optimizing app metadata:", error);
		throw error;
	}
}

// Helper function to extract fields from text if JSON parsing fails
// function extractMetadataField(text: any, field: string): string | null {
// 	if (typeof text !== "string") {
// 		if (typeof text === "object" && text[field]) {
// 			return text[field];
// 		}
// 		return null;
// 	}

// 	const regex = new RegExp(`"?${field}"?\\s*:\\s*"([^"]+)"`, "i");
// 	const match = text.match(regex);
// 	return match ? match[1] : null;
// }
