import { LLMModel } from '../types';

export const AVAILABLE_LLM_MODELS: LLMModel[] = [
  {
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'OpenAI',
    description: 'Latest GPT model with enhanced reasoning and multimodal capabilities',
    maxTokens: 128000,
    costPerToken: 0.00003,
    isAvailable: true
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    description: 'Most capable Claude model with advanced analysis and coding abilities',
    maxTokens: 200000,
    costPerToken: 0.000075,
    isAvailable: true
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    description: 'Google\'s most advanced model with superior multimodal understanding',
    maxTokens: 1000000,
    costPerToken: 0.00001,
    isAvailable: true
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    provider: 'xAI',
    description: 'Elon Musk\'s latest AI model with real-time information access',
    maxTokens: 128000,
    costPerToken: 0.00002,
    isAvailable: true
  },
  {
    id: 'llama-4',
    name: 'Llama 4',
    provider: 'Meta',
    description: 'Open-source model with excellent code analysis capabilities',
    maxTokens: 128000,
    costPerToken: 0.00001,
    isAvailable: true
  },
  {
    id: 'deepseek-v3.1',
    name: 'DeepSeek V3.1',
    provider: 'DeepSeek',
    description: 'Advanced reasoning model optimized for technical analysis',
    maxTokens: 64000,
    costPerToken: 0.000014,
    isAvailable: true
  }
];

export const SUPPORTED_FILE_TYPES = [
  // Web Technologies
  '.html', '.htm', '.xml', '.qml', '.css', '.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte',
  
  // Audio Files
  '.mp3', '.aac', '.wav', '.flac', '.ogg', '.m4a',
  
  // Video Files
  '.mp4', '.avi', '.mkv', '.mov', '.m4v', '.3gp',
  
  // Image Files
  '.jpg', '.jpeg', '.png', '.bmp', '.gif', '.webp', '.svg', '.ico', '.icns',
  
  // Programming Languages
  '.c', '.cpp', '.h', '.hpp', '.java', '.kt', '.py', '.cs',
  
  // Binary Files
  '.so', '.dll', '.elf', '.bin', '.hex', '.dex', '.pyo', '.pyc',
  
  // Script Files
  '.sh', '.bat', '.ps1',
  
  // Database Files
  '.db', '.sqlite', '.mdb', '.nfs', '.img', '.geojson', '.kml', '.kmz', '.gpx', '.ndb', '.mdx',
  
  // Configuration Files
  '.json', '.ini', '.cfg', '.conf', '.yaml', '.yml', '.properties', '.plist',
  
  // Automotive/Network Files
  '.bt', '.can', '.dbc', '.log', '.txt', '.pcap', '.pcapng',
  
  // Package Files
  '.apk', '.ipa', '.deb', '.rpm', '.zip', '.tar', '.tar.gz', '.iso', '.7z',
  
  // Font Files
  '.ttf', '.otf', '.ttc', '.res', '.arsc',
  
  // Security Files
  '.pem', '.crt', '.key', '.der', '.pfx', '.p12'
] as const;
