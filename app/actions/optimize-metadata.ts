"use server"
import { optimizeAppMetadata } from "@/lib/huggingface-api"
import { getAppMetadata, saveOptimizationResult } from "@/lib/firestore"

export async function optimizeMetadata(appId: string) {
  try {
    // Get the app metadata from Firestore
    const app = await getAppMetadata(appId)

    // Optimize the metadata using Hugging Face API
    const optimizedMetadata = await optimizeAppMetadata(app.name, app.subtitle, app.description, app.category)

    // Save the optimization result to Firestore
    const result = await saveOptimizationResult({
      appId,
      originalTitle: app.name,
      originalSubtitle: app.subtitle,
      originalDescription: app.description,
      optimizedTitle: optimizedMetadata.title,
      optimizedSubtitle: optimizedMetadata.subtitle,
      optimizedDescription: optimizedMetadata.description,
    })

    return result
  } catch (error) {
    console.error("Error optimizing metadata:", error)
    throw error
  }
}
