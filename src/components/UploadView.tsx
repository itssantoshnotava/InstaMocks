import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, CloudLightning, FileText, CheckCircle2, AlertCircle, Trash2, Database, Search, Sparkles, Check } from 'lucide-react';
import { PDFFile } from '../types';

interface UploadViewProps {
  pdfs: PDFFile[];
  onAddPdf: (pdf: PDFFile) => void;
  onDeletePdf: (id: string) => void;
}

export default function UploadView({ pdfs, onAddPdf, onDeletePdf }: UploadViewProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [currentUploadingName, setCurrentUploadingName] = useState('');
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Simulate file upload progress
  const startSimulatedUpload = (filename: string, sizeStr: string, subject: string) => {
    setCurrentUploadingName(filename);
    setUploadProgress(1);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          
          // Complete upload and add the PDF
          const subjects = ['Physics', 'Mathematics', 'Chemistry', 'Biology'];
          const randomSubject = subject || subjects[Math.floor(Math.random() * subjects.length)];
          const generatedId = `pdf-${Date.now()}`;
          const newPdf: PDFFile = {
            id: generatedId,
            name: filename,
            size: sizeStr,
            uploadedAt: 'Just Now',
            pages: Math.floor(Math.random() * 25) + 10,
            status: 'processed',
            subject: randomSubject,
            questionsDetected: Math.floor(Math.random() * 15) + 8
          };
          onAddPdf(newPdf);
          
          // Reset status card after a delay
          setTimeout(() => {
            setUploadProgress(null);
          }, 1500);

          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.pdf')) {
        const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        startSimulatedUpload(file.name, sizeInMb, 'Physics');
      } else {
        alert('Please upload a valid PDF file. Other file types are not supported yet.');
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.pdf')) {
        const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        startSimulatedUpload(file.name, sizeInMb, 'Physics');
      } else {
        alert('Please upload a valid PDF file.');
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Google Drive Simulation
  const handleConnectDrive = () => {
    setShowDriveModal(true);
  };

  const confirmConnectDrive = () => {
    setIsDriveConnected(true);
    setShowDriveModal(false);
  };

  // Import a simulated file from GDrive
  const importDriveFile = (filename: string, subject: string) => {
    startSimulatedUpload(filename, '3.5 MB', subject);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Upload past papers and guides</h1>
        <p className="text-sm text-gray-400 mt-1">Transcribe scanned papers using high-fidelity multi-column OCR parsing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Drag/Drop Interface Panel (7 Columns) */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          
          {/* File Upload Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all min-h-80 relative ${
              dragActive 
                ? 'border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-500/5' 
                : 'border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 hover:border-gray-700/80'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".pdf" 
              onChange={handleFileInputChange}
              className="hidden" 
            />

            <div className="space-y-4 max-w-sm flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-950 flex items-center justify-center text-blue-400 shadow-xl border border-gray-800">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <button
                  onClick={handleButtonClick}
                  className="text-sm font-bold text-blue-400 hover:text-blue-300 underline shrink-0 cursor-pointer"
                >
                  Click to drop/upload a PDF file
                </button>
                <span className="text-sm text-gray-400"> or drag and drop your file here</span>
              </div>
              <p className="text-xs text-gray-500 leading-normal">
                Supports standard Board papers (A4, Single raw scan, Multi-column worksheets) up to 100MB per file.
              </p>
            </div>

            {/* Simulated Live Progress Bar Container */}
            {uploadProgress !== null && (
              <div className="absolute inset-0 bg-gray-950/95 rounded-3xl p-8 flex flex-col justify-center items-center z-10 transition-all">
                <div className="max-w-md w-full text-left space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-950 rounded-xl">
                      <FileText className="w-6 h-6 text-blue-400 text-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display truncate max-w-[280px]">
                        {currentUploadingName}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">Transcribing equations and questions structures...</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${uploadProgress}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-150"
                      />
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-blue-400 font-semibold">
                        {uploadProgress === 100 ? 'OCR Parsing Completed!' : 'Running transcription model...'}
                      </span>
                      <span className="text-gray-400 font-medium">{uploadProgress}%</span>
                    </div>
                  </div>

                  {uploadProgress === 100 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-green-950/40 border border-green-900/30 text-green-400 rounded-xl text-xs flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Mock generator database synced! Access via the navigation menu.
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Connect Google Drive Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-900/30 text-emerald-400">
                <CloudLightning className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-white font-display">Fast Google Drive Connection</h3>
                <p className="text-xs text-gray-400 mt-0.5">Link folders of resources, chapters or drive question banks instantly.</p>
              </div>
            </div>

            <button
              onClick={handleConnectDrive}
              id="btn-connect-drive"
              type="button"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                isDriveConnected 
                  ? 'bg-gray-800 text-gray-300 border border-gray-700/50' 
                  : 'bg-[#0F9D58] hover:bg-[#0b8043] text-white shadow-md'
              }`}
            >
              {isDriveConnected ? (
                <>
                  <Check className="w-4 h-4" /> Connected to Drive
                </>
              ) : (
                'Connect Drive Hub'
              )}
            </button>
          </div>

          {/* Selected File Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Uploaded File Records</h2>
              <span className="text-xs text-gray-400 font-mono font-medium">{pdfs.length} Archives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pdfs.map((pdf) => (
                <div 
                  key={pdf.id}
                  className="bg-gray-900 border border-gray-800 p-4.5 rounded-2xl flex flex-col justify-between hover:border-gray-700 transition-all shadow-sm relative group"
                >
                  <button
                    onClick={() => onDeletePdf(pdf.id)}
                    id={`btn-delete-pdf-${pdf.id}`}
                    className="absolute top-4 right-4 p-1.5 bg-gray-950/80 border border-gray-800 rounded-lg text-gray-500 hover:text-red-400 hover:border-red-900/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Delete PDF source"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-start gap-3.5 pr-6">
                    <div className="p-2.5 bg-gray-950 border border-gray-800 text-red-400 font-mono text-[10px] rounded-xl shrink-0 font-bold">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-gray-200 truncate" title={pdf.name}>
                        {pdf.name}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1 font-mono">
                        Pages: {pdf.pages} • Size: {pdf.size}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-gray-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        pdf.status === 'processed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                      <span className="text-[10px] text-gray-400 font-medium capitalize">
                        {pdf.status ? pdf.status.replace('_', ' ') : 'processed'}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 bg-blue-950 text-blue-400 text-[10px] tracking-wide font-bold uppercase rounded border border-blue-900/40">
                      {pdf.questionsDetected} Qs parsed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info Section (4 Columns) */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-blue-400" />
              OCR Transcription Engine
            </h3>
            <p className="text-xs text-gray-400 leading-normal">
              Our models don't just extract text. They map standard math notation, formulas, chemical diagrams, and multi-option structures directly into parsed interactive questions with step-by-step metadata sheets.
            </p>
            <div className="p-3.5 bg-gray-950 rounded-xl border border-gray-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Inline Diagram Mapping
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> LaTeX Equation Support
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Correct Option Layouts
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Troubleshooting Guides</h3>
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start text-xs leading-normal text-gray-400">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-200">Scanned images blur</div>
                  <p className="mt-0.5 text-gray-500 text-[11px]">Ensure scanning resolutions are &gt; 300 DPI for high-yield scientific equations math structures.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start text-xs leading-normal text-gray-400">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-200">Scrambled columns</div>
                  <p className="mt-0.5 text-gray-500 text-[11px]">Multi-column layouts are handled automatically. Drop any sheet as a whole; our layout extractor resolves it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Google Drive Import Modal Simulation */}
      <AnimatePresence>
        {showDriveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDriveModal(false)}></div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-lg w-full relative z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#0F9D58]/10 text-[#0F9D58] rounded-lg">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Select from Google Drive</h3>
                    <p className="text-[11px] text-gray-500">Google Drive API sandbox access active</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDriveModal(false)}
                  className="text-xs text-gray-500 hover:text-white px-2 py-1 rounded-md hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>

              {/* Fake GDrive search and folder simulation */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search documents or PDFs in My Drive..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-blue-500"
                    defaultValue="PYQs Physics 2025"
                  />
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {[
                    { name: 'JEE_Advanced_Mathematics_Algebra_Matrices.pdf', folder: 'My Drive / Prep Files', size: '2.4 MB', subject: 'Mathematics' },
                    { name: 'IIT_Physics_Thermodynamics_Selected.pdf', folder: 'Shared With Me', size: '4.1 MB', subject: 'Physics' },
                    { name: 'NEET_Biology_Preps_Photosynthesis.pdf', folder: 'Cloned Folder', size: '3.9 MB', subject: 'Biology' },
                    { name: 'O_Level_Organic_Chemistry_Nomenclature.pdf', folder: 'My Drive / Scans', size: '1.9 MB', subject: 'Chemistry' },
                  ].map((file) => (
                    <div 
                      key={file.name}
                      className="p-3 bg-gray-950/60 hover:bg-gray-950 border border-gray-800/60 hover:border-blue-900/40 rounded-xl flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-red-950/40 text-red-400 rounded-lg text-[9px] font-bold font-mono">
                          PDF
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-gray-300 truncate max-w-[240px]" title={file.name}>
                            {file.name}
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">
                            {file.folder} • {file.size}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowDriveModal(false);
                          importDriveFile(file.name, file.subject);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                      >
                        Import Link
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-[11px]">
                <span className="text-gray-500">Connected account: <strong className="text-gray-400">sai3@gmail.com</strong></span>
                <button
                  onClick={confirmConnectDrive}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl transition-all"
                >
                  Link Drive Workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
