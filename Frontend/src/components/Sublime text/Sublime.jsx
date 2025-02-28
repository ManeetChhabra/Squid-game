import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';

const initialFiles = [
  { name: 'main.js', code: '// Start coding in main.js...\nconsole.log("Hello from main.js");' },
  { name: 'helper.js', code: '// Helper functions go here\nfunction greet() { return "Hello!"; }' },
];

const Sublime = () => {
  const [files, setFiles] = useState(initialFiles);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [output, setOutput] = useState('');
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);

  const activeFile = files[activeFileIndex];

  // Handle code change in the editor
  const onCodeChange = (newValue) => {
    const updatedFiles = [...files];
    updatedFiles[activeFileIndex].code = newValue;
    setFiles(updatedFiles);
  };

  // Save the current file to the backend
  const saveFile = async () => {
    setSaving(true);
    try {
      const res = await axios.post('http://localhost:5000/api/file', {
        filename: activeFile.name,
        code: activeFile.code,
      });
      alert(res.data.message);
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file.');
    }
    setSaving(false);
  };

  // Run the current file via backend
  const runCode = async () => {
    setRunning(true);
    try {
      const res = await axios.post('http://localhost:5000/api/run-code', {
        filename: activeFile.name,
        code: activeFile.code,
      });
      console.log('Backend response:', res.data); // Log the response for debugging
      setOutput(res.data.output);
    } catch (error) {
      console.error('Error running code:', error);
      if (error.response && error.response.data) {
        setOutput(error.response.data.output);
      } else {
        setOutput('Error running code.');
      }
    }
    setRunning(false);
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: 14,
    theme: 'vs-dark',
    minimap: { enabled: false },
    automaticLayout: true,
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Sidebar File Explorer */}
      <div className="md:w-1/4 w-full md:h-full bg-white shadow-lg p-4">
        <h3 className="text-xl font-bold text-orange-600 mb-4">Files</h3>
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={file.name}
              onClick={() => setActiveFileIndex(index)}
              className={`cursor-pointer p-2 rounded transition duration-300 
                  ${activeFileIndex === index ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-orange-200'}`}
            >
              {file.name}
            </li>
          ))}
        </ul>
        {/* Optionally, add a button to create a new file */}
      </div>

      {/* Main Editor and Controls */}
      <div className="flex-1 flex flex-col">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between bg-orange-600 text-white px-4 py-2">
          <span className="text-lg">
            Editing: <strong>{activeFile.name}</strong>
          </span>
          <div className="space-x-3">
            <button
              onClick={saveFile}
              disabled={saving}
              className="px-3 py-1 rounded bg-white text-orange-600 font-semibold hover:bg-gray-100 transition duration-300"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={runCode}
              disabled={running}
              className="px-3 py-1 rounded bg-white text-orange-600 font-semibold hover:bg-gray-100 transition duration-300"
            >
              {running ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-grow">
          <MonacoEditor
            width="100%"
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={activeFile.code}
            options={editorOptions}
            onChange={onCodeChange}
          />
        </div>

        {/* Output Console */}
        <div className="h-40 bg-gray-900 text-white p-4 overflow-y-auto">
          <h4 className="font-bold mb-2">Output:</h4>
          <pre className="whitespace-pre-wrap">{output || 'No output yet.'}</pre>
        </div>
      </div>
    </div>
  );
};

export default Sublime;
