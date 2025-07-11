// Declare the window property to avoid TypeScript errors
declare global {
	interface Window {
		KILOCODE_BASE_URL?: string
	}
}

export function getKiloCodeBackendSignInUrl(uriScheme: string = "vscode", uiKind: string = "Desktop") {
	// Check window first (runtime from extension), then process.env (build-time from Vite)
	const baseUrl = window.KILOCODE_BASE_URL || process.env.KILOCODE_BASE_URL || "https://kilocode.ai"
	const source = uiKind === "Web" ? "web" : uriScheme
	return `${baseUrl}/sign-in-to-editor?source=${source}`
}

export function getKiloCodeBackendSignUpUrl(uriScheme: string = "vscode", uiKind: string = "Desktop") {
	// Check window first (runtime from extension), then process.env (build-time from Vite)
	const baseUrl = window.KILOCODE_BASE_URL || process.env.KILOCODE_BASE_URL || "https://kilocode.ai"
	const source = uiKind === "Web" ? "web" : uriScheme
	return `${baseUrl}/users/sign_up?source=${source}`
}
