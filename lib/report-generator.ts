/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveReport } from "@/lib/firestore";
import type { AppMetadata, OptimizationResult } from "@/types/app-data";

interface ReportData {
	app: AppMetadata;
	optimizationResults: OptimizationResult[];
	userId: string;
}

export async function generatePdfReport(data: ReportData) {
	const { app, optimizationResults, userId } = data;

	// Create new PDF document
	const doc = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: "a4",
	});

	// Add report title
	doc.setFontSize(24);
	doc.text("iOS Metadata Optimization Report", 105, 15, { align: "center" });

	// Add app info
	doc.setFontSize(18);
	doc.text(`App: ${app.name}`, 20, 30);

	doc.setFontSize(12);
	doc.text(`Category: ${app.category}`, 20, 40);
	doc.text(`App Store URL: ${app.appStoreUrl}`, 20, 45);
	doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 50);

	// Add current metadata section
	doc.setFontSize(18);
	doc.text("Current Metadata", 20, 65);

	doc.setFontSize(12);
	doc.text("Title:", 20, 75);
	doc.text(app.name, 40, 75);
	doc.text(`(${app.name.length}/30 characters)`, 170, 75, { align: "right" });

	doc.text("Subtitle:", 20, 85);
	doc.text(app.subtitle, 40, 85);
	doc.text(`(${app.subtitle.length}/30 characters)`, 170, 85, {
		align: "right",
	});

	doc.text("Description:", 20, 95);

	// Handle multiline description
	const descriptionLines = doc.splitTextToSize(app.description, 150);
	doc.text(descriptionLines, 40, 95);

	// Calculate position after description
	const descriptionEndY = 95 + descriptionLines.length * 5;
	doc.text(
		`(${app.description.length}/4000 characters)`,
		170,
		descriptionEndY + 5,
		{ align: "right" }
	);

	// Add optimized metadata section if available
	if (optimizationResults.length > 0) {
		const latestOptimization = optimizationResults[0];

		doc.setFontSize(18);
		doc.text("Optimized Metadata", 20, descriptionEndY + 20);

		doc.setFontSize(12);
		doc.text("Optimized Title:", 20, descriptionEndY + 30);
		doc.text(latestOptimization.optimizedTitle, 60, descriptionEndY + 30);
		doc.text(
			`(${latestOptimization.optimizedTitle.length}/30 characters)`,
			170,
			descriptionEndY + 30,
			{
				align: "right",
			}
		);

		doc.text("Optimized Subtitle:", 20, descriptionEndY + 40);
		doc.text(latestOptimization.optimizedSubtitle, 60, descriptionEndY + 40);
		doc.text(
			`(${latestOptimization.optimizedSubtitle.length}/30 characters)`,
			170,
			descriptionEndY + 40,
			{
				align: "right",
			}
		);

		doc.text("Optimized Description:", 20, descriptionEndY + 50);

		// Handle multiline optimized description
		const optimizedDescLines = doc.splitTextToSize(
			latestOptimization.optimizedDescription,
			130
		);
		doc.text(optimizedDescLines, 60, descriptionEndY + 50);

		// Calculate position after optimized description
		const optimizedDescEndY =
			descriptionEndY + 50 + optimizedDescLines.length * 5;
		doc.text(
			`(${latestOptimization.optimizedDescription.length}/4000 characters)`,
			170,
			optimizedDescEndY + 5,
			{
				align: "right",
			}
		);

		// Add optimization history if there are multiple results
		if (optimizationResults.length > 1) {
			doc.setFontSize(18);
			doc.text("Optimization History", 20, optimizedDescEndY + 20);

			// Create table for optimization history
			const historyTableRows = optimizationResults.map((result, index) => [
				`Version ${index + 1}`,
				new Date(result.createdAt).toLocaleDateString(),
				result.optimizedTitle.length > 20
					? result.optimizedTitle.substring(0, 20) + "..."
					: result.optimizedTitle,
				result.optimizedSubtitle.length > 20
					? result.optimizedSubtitle.substring(0, 20) + "..."
					: result.optimizedSubtitle,
			]);

			// @ts-ignore - jspdf-autotable types
			doc.autoTable({
				startY: optimizedDescEndY + 25,
				head: [["Version", "Date", "Title", "Subtitle"]],
				body: historyTableRows,
			});
		}
	} else {
		doc.setFontSize(14);
		doc.text(
			"No optimization results available yet.",
			20,
			descriptionEndY + 20
		);
	}

	// Add optimization tips
	// Get the y position after the table
	const finalY = (doc as any).lastAutoTable
		? (doc as any).lastAutoTable.finalY
		: descriptionEndY + 30;

	doc.setFontSize(18);
	doc.text("App Store Optimization Tips", 20, finalY + 15);

	const tips = [
		"Include relevant keywords in your title and subtitle",
		"Keep your title clear, descriptive, and under 30 characters",
		"Use your subtitle to highlight key features (30 characters max)",
		"Structure your description with short paragraphs and bullet points",
		"Update your metadata regularly to improve rankings",
	];

	let tipY = finalY + 25;
	tips.forEach((tip) => {
		doc.setFontSize(12);
		doc.text(`• ${tip}`, 25, tipY);
		tipY += 10;
	});

	// Add footer
	const pageCount = doc.getNumberOfPages();
	doc.setFontSize(10);
	for (let i = 1; i <= pageCount; i++) {
		doc.setPage(i);
		doc.text(
			`Generated by iOS Metadata Optimizer | ${new Date().toLocaleDateString()}`,
			105,
			285,
			{ align: "center" }
		);
		doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: "right" });
	}

	// Convert to blob and save
	// Removed unused 'pdfBlob' variable assignment
	doc.output("blob");

	// Create a File object to upload
	// Removed unused 'file' variable assignment

	// In a real app, you would upload this to Firebase Storage
	// and get back a download URL
	// For now, we'll just create a dummy URL
	const downloadUrl = "https://example.com/reports/report.pdf";

	// Save report metadata to Firestore
	const savedReport = await saveReport({
		userId,
		appId: app.id,
		title: `${app.name} Metadata Optimization`,
		date: new Date().toISOString(),
		type: "standard",
		url: downloadUrl,
	});

	return {
		report: savedReport,
		// In a real implementation, you would return the actual download URL
		downloadUrl,
	};
}
