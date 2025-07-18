---
sidebar_label: Groq
---

# Using Groq With Kilo Code

Groq provides ultra-fast inference for various AI models through their high-performance infrastructure. Kilo Code supports accessing models through the Groq API.

**Website:** [https://groq.com/](https://groq.com/)

## Getting an API Key

1. **Sign Up/Sign In:** Go to [Groq Console](https://console.groq.com/). Create an account or sign in.
2. **Create API Key:** Navigate to the API Keys section and create a new API key.
3. **Copy API Key:** Copy the generated API key for use in Kilo Code.

## Supported Models

Kilo Code supports the following models through Groq:

| Model ID | Provider | Context Window | Notes |
|----------|----------|----------------|-------|
| `moonshotai/kimi-k2-instruct` | Moonshot AI | 128K tokens | Optimized max_tokens limit configured |
| `llama-3.3-70b-versatile` | Meta | 128K tokens | High-performance Llama model |
| `llama-3.1-70b-versatile` | Meta | 128K tokens | Versatile reasoning capabilities |
| `llama-3.1-8b-instant` | Meta | 128K tokens | Fast inference for quick tasks |
| `mixtral-8x7b-32768` | Mistral AI | 32K tokens | Mixture of experts architecture |

**Note:** Model availability may change. Refer to the [Groq documentation](https://console.groq.com/docs/models) for the latest model list and specifications.

## Configuration in Kilo Code

1. **Open Kilo Code Settings:** Click the gear icon (<Codicon name="gear" />) in the Kilo Code panel.
2. **Select Provider:** Choose "Groq" from the "API Provider" dropdown.
3. **Enter API Key:** Paste your Groq API key into the "Groq API Key" field.
4. **Select Model:** Choose your desired model from the "Model" dropdown.

## Model-Specific Features

### Kimi K2 Model

The `moonshotai/kimi-k2-instruct` model includes optimized configuration:

- **Max Tokens Limit:** Automatically configured with appropriate limits for optimal performance
- **Context Understanding:** Excellent for complex reasoning and long-context tasks
- **Multilingual Support:** Strong performance across multiple languages

## Tips and Notes

- **Ultra-Fast Inference:** Groq's hardware acceleration provides exceptionally fast response times
- **Cost-Effective:** Competitive pricing for high-performance inference
- **Rate Limits:** Be aware of API rate limits based on your Groq plan
- **Model Selection:** Choose models based on your specific use case:
  - **Kimi K2**: Best for complex reasoning and multilingual tasks
  - **Llama 3.3 70B**: Excellent general-purpose performance
  - **Llama 3.1 8B Instant**: Fastest responses for simple tasks
  - **Mixtral**: Good balance of performance and efficiency

## Troubleshooting

- **"Invalid API Key":** Verify your API key is correct and active in the Groq Console
- **"Model Not Available":** Check if the selected model is available in your region
- **Rate Limit Errors:** Monitor your usage in the Groq Console and consider upgrading your plan
- **Connection Issues:** Ensure you have a stable internet connection and Groq services are operational

## Pricing

Groq offers competitive pricing based on input and output tokens. Visit the [Groq pricing page](https://groq.com/pricing/) for current rates and plan options.