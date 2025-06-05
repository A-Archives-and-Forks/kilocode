import { Project, SourceFile } from "ts-morph"
import * as path from "path"
import * as fs from "fs"
import * as os from "os"
import { SymbolExtractor } from "../core/SymbolExtractor"
import { SymbolResolver } from "../core/SymbolResolver"
import { ensureDirectoryExists } from "../utils/file-system"

describe("SymbolExtractor Tests", () => {
	let tempDir: string
	let project: Project
	let sourceFile: SourceFile
	let symbolExtractor: SymbolExtractor
	let symbolResolver: SymbolResolver

	beforeEach(async () => {
		// Create a temporary directory for test files
		tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "symbol-extractor-test-"))

		// Initialize project
		project = new Project({
			useInMemoryFileSystem: true,
		})

		symbolExtractor = new SymbolExtractor()
		symbolResolver = new SymbolResolver(project)

		// Create source directory
		const sourceDir = path.join(tempDir, "src")
		await ensureDirectoryExists(sourceDir)
	})

	afterEach(() => {
		// Clean up temp directory
		if (fs.existsSync(tempDir)) {
			fs.rmSync(tempDir, { recursive: true, force: true })
		}
	})

	it("should extract dependencies with nested type references", async () => {
		// Create a source file with nested type references
		const sourceContent = `
      import { User } from "./models/user"
      import { ApiResponse } from "./api/types"
      
      interface ValidationResult {
        isValid: boolean;
        errors: string[];
      }
      
      interface DetailedError {
        code: string;
        message: string;
      }
      
      interface ValidationResultWithDetails extends ValidationResult {
        detailedErrors: DetailedError[];
      }
      
      export function validateUser(user: User): ValidationResultWithDetails {
        const result: ValidationResultWithDetails = {
          isValid: true,
          errors: [],
          detailedErrors: []
        };
        
        if (!user.email || !user.email.includes('@')) {
          result.isValid = false;
          result.errors.push('Invalid email');
          result.detailedErrors.push({
            code: 'INVALID_EMAIL',
            message: 'Email address is not valid'
          });
        }
        
        return result;
      }
      
      export function processApiResponse(response: ApiResponse<User>): User {
        return response.data;
      }
    `

		// Add the file to the project
		sourceFile = project.createSourceFile(path.join(tempDir, "src/validator.ts"), sourceContent)

		// Get the validateUser function node
		const functionNode = sourceFile.getFunction("validateUser")
		if (!functionNode) {
			fail("Failed to find validateUser function")
			return
		}

		// Resolve the symbol
		const symbol = symbolResolver.resolveSymbol(
			{
				type: "identifier",
				name: "validateUser",
				kind: "function",
				filePath: sourceFile.getFilePath(),
			},
			sourceFile,
		)

		if (!symbol) {
			fail("Failed to resolve validateUser symbol")
			return
		}

		// Extract dependencies
		const extractedSymbol = symbolExtractor.extractSymbol(symbol)

		// Verify that all dependencies are correctly extracted
		expect(extractedSymbol.dependencies.imports.has("User")).toBe(true)
		expect(extractedSymbol.dependencies.imports.get("User")).toBe("./models/user")

		// Verify that nested type references are included
		expect(extractedSymbol.dependencies.types).toContain("ValidationResultWithDetails")
		expect(extractedSymbol.dependencies.types).toContain("ValidationResult")
		expect(extractedSymbol.dependencies.types).toContain("DetailedError")

		// Verify the text includes all necessary type definitions
		expect(extractedSymbol.text).toContain("interface ValidationResult")
		expect(extractedSymbol.text).toContain("interface DetailedError")
		expect(extractedSymbol.text).toContain("interface ValidationResultWithDetails")
	})

	it("should extract dependencies with generic type arguments", async () => {
		// Create a source file with generic type arguments
		const sourceContent = `
      import { User } from "./models/user"
      import { ApiResponse, Paginated } from "./api/types"
      
      export function processUsers(response: ApiResponse<Paginated<User[]>>): User[] {
        return response.data.items;
      }
    `

		// Add the file to the project
		sourceFile = project.createSourceFile(path.join(tempDir, "src/processor.ts"), sourceContent)

		// Get the processUsers function node
		const functionNode = sourceFile.getFunction("processUsers")
		if (!functionNode) {
			fail("Failed to find processUsers function")
			return
		}

		// Resolve the symbol
		const symbol = symbolResolver.resolveSymbol(
			{
				type: "identifier",
				name: "processUsers",
				kind: "function",
				filePath: sourceFile.getFilePath(),
			},
			sourceFile,
		)

		if (!symbol) {
			fail("Failed to resolve processUsers symbol")
			return
		}

		// Extract dependencies
		const extractedSymbol = symbolExtractor.extractSymbol(symbol)

		// Verify that all dependencies are correctly extracted
		expect(extractedSymbol.dependencies.imports.has("User")).toBe(true)
		expect(extractedSymbol.dependencies.imports.get("User")).toBe("./models/user")
		expect(extractedSymbol.dependencies.imports.has("ApiResponse")).toBe(true)
		expect(extractedSymbol.dependencies.imports.has("Paginated")).toBe(true)
		expect(extractedSymbol.dependencies.imports.get("ApiResponse")).toBe("./api/types")
		expect(extractedSymbol.dependencies.imports.get("Paginated")).toBe("./api/types")
	})
})
