import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Alert,
  useTheme
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  InsertDriveFile
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadedFile } from '../../types';
import { SUPPORTED_FILE_TYPES } from '../../data/llmModels';

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  maxFiles = 50,
  maxSize = 100
}) => {
  const theme = useTheme();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({});

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = [];
    const errors: { [key: string]: string } = {};

    // Check file count limit
    if (files.length + acceptedFiles.length > maxFiles) {
      setUploadErrors({ general: `Maximum ${maxFiles} files allowed` });
      return;
    }

    for (const file of acceptedFiles) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      // Check file type
      if (!SUPPORTED_FILE_TYPES.includes(fileExtension as any)) {
        errors[file.name] = `Unsupported file type: ${fileExtension}`;
        continue;
      }

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        errors[file.name] = `File too large. Maximum size: ${maxSize}MB`;
        continue;
      }

      // Simulate file reading progress
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
      try {
        const content = await readFileContent(file);
        
        const uploadedFile: UploadedFile = {
          id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          content,
          lastModified: new Date(file.lastModified),
          path: file.webkitRelativePath || file.name
        };

        newFiles.push(uploadedFile);
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      } catch (error) {
        errors[file.name] = 'Failed to read file content';
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      }
    }

    setUploadErrors(errors);
    onFilesChange([...files, ...newFiles]);
  }, [files, onFilesChange, maxFiles, maxSize]);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      
      // For text files, read as text
      if (file.type.startsWith('text/') || 
          file.name.endsWith('.js') || 
          file.name.endsWith('.ts') || 
          file.name.endsWith('.jsx') || 
          file.name.endsWith('.tsx') || 
          file.name.endsWith('.html') || 
          file.name.endsWith('.css') || 
          file.name.endsWith('.json') ||
          file.name.endsWith('.xml') ||
          file.name.endsWith('.qml')) {
        reader.readAsText(file);
      } else {
        // For binary files, read as base64
        reader.readAsDataURL(file);
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.xml', '.qml'],
      'application/json': ['.json'],
      'application/xml': ['.xml'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
      'application/octet-stream': ['.bin', '.so', '.dll', '.exe']
    },
    multiple: true
  });

  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    return <InsertDriveFile />;
  };

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
          backgroundColor: isDragActive 
            ? theme.palette.primary.main + '10' 
            : theme.palette.background.paper,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main + '05'
          }
        }}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ scale: isDragActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <CloudUpload
            sx={{
              fontSize: 64,
              color: isDragActive ? theme.palette.primary.main : theme.palette.text.secondary,
              mb: 2
            }}
          />
        </motion.div>
        
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Drop files here' : 'Upload your infotainment system files'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Drag and drop files here, or click to select files
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center" mt={2}>
          {SUPPORTED_FILE_TYPES.slice(0, 10).map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
          <Chip
            label={`+${SUPPORTED_FILE_TYPES.length - 10} more`}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>

        <Typography variant="caption" color="text.secondary" display="block" mt={2}>
          Maximum {maxFiles} files, {maxSize}MB per file
        </Typography>
      </Paper>

      {uploadErrors.general && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {uploadErrors.general}
        </Alert>
      )}

      {files.length > 0 && (
        <Paper sx={{ mt: 3 }}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Uploaded Files ({files.length})
            </Typography>
            
            <List>
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        mb: 1,
                        backgroundColor: theme.palette.background.paper
                      }}
                    >
                      <Box sx={{ mr: 2, color: theme.palette.primary.main }}>
                        {getFileIcon(file.name)}
                      </Box>
                      
                      <ListItemText
                        primary={file.name}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              {formatFileSize(file.size)} • {file.type}
                            </Typography>
                            {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                              <LinearProgress
                                variant="determinate"
                                value={uploadProgress[file.name]}
                                sx={{ mt: 1, height: 4, borderRadius: 2 }}
                              />
                            )}
                            {uploadErrors[file.name] && (
                              <Typography variant="caption" color="error" display="block">
                                {uploadErrors[file.name]}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => removeFile(file.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FileUpload;
