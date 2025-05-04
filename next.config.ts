import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyCKEzA9G_3l_SP1sMdXiytsannl__7BegI",
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "aso-audit.firebaseapp.com",
		NEXT_PUBLIC_FIREBASE_PROJECT_ID: "aso-audit",
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "aso-audit.firebasestorage.app",
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "512536678288",
		NEXT_PUBLIC_FIREBASE_APP_ID: "1:512536678288:web:bba73a55451aba8e56ed15",
		NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-MB9W8WCT3Q",
	},
};

export default nextConfig;
