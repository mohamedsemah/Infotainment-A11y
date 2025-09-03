from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Database
    database_url: str = "sqlite:///./accessibility_analysis.db"
    
    # JWT
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # LLM API Keys
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    google_api_key: str = ""
    groq_api_key: str = ""
    huggingface_api_key: str = ""
    deepseek_api_key: str = ""
    
    # File Upload
    max_file_size: str = "100MB"
    upload_dir: str = "./uploads"
    allowed_extensions: str = ".html,.htm,.xml,.qml,.css,.js,.ts,.jsx,.tsx,.vue,.svelte,.mp3,.aac,.wav,.flac,.ogg,.m4a,.mp4,.avi,.mkv,.mov,.m4v,.3gp,.jpg,.jpeg,.png,.bmp,.gif,.webp,.svg,.ico,.icns,.c,.cpp,.h,.hpp,.java,.kt,.py,.cs,.so,.dll,.elf,.bin,.hex,.dex,.pyo,.pyc,.sh,.bat,.ps1,.db,.sqlite,.mdb,.nfs,.img,.geojson,.kml,.kmz,.gpx,.ndb,.mdx,.json,.ini,.cfg,.conf,.yaml,.yml,.properties,.plist,.bt,.can,.dbc,.log,.txt,.pcap,.pcapng,.apk,.ipa,.deb,.rpm,.zip,.tar,.tar.gz,.iso,.7z,.ttf,.otf,.ttc,.res,.arsc,.pem,.crt,.key,.der,.pfx,.p12"
    
    # CORS
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    
    # Analysis
    max_concurrent_analyses: int = 5
    analysis_timeout: int = 300
    
    class Config:
        env_file = ".env"
        case_sensitive = False
    
    @property
    def allowed_extensions_list(self) -> List[str]:
        return [ext.strip() for ext in self.allowed_extensions.split(",")]
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    @property
    def max_file_size_bytes(self) -> int:
        size_str = self.max_file_size.upper()
        if size_str.endswith('MB'):
            return int(size_str[:-2]) * 1024 * 1024
        elif size_str.endswith('GB'):
            return int(size_str[:-2]) * 1024 * 1024 * 1024
        else:
            return int(size_str)

settings = Settings()
