"use server";
import { getAppMetadata, getAppOptimizationResults } from "@/lib/firestore";
import { generatePdfReport } from "@/lib/report-generator";

export async function generateReport(appId: string, userId: string) {
	try {
		// Get all necessary data for the report
		const app = await getAppMetadata(appId);
		const optimizationResults = await getAppOptimizationResults(appId);

		// Generate PDF report
		const reportData = {
			app,
			optimizationResults,
			userId,
		};

		const report = await generatePdfReport(reportData);

		return report;
	} catch (error) {
		console.error("Error generating report:", error);
		throw error;
	}
}
