import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import certificateTemplate from '../assets/certificate-template.png';
import './CertificateGenerator.css';

const CertificateGenerator = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [generated, setGenerated] = useState(false);
  const certificateRef = useRef(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (name.trim() && course.trim()) {
      setGenerated(true);
    }
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `${name.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const handleReset = () => {
    setName('');
    setCourse('');
    setGenerated(false);
  };

  return (
    <div className="generator-container">
      {/* -------- INPUT FORM -------- */}
      <div className="form-section">
        <h2>Enter Your Details</h2>
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course Name</label>
            <input
              id="course"
              type="text"
              placeholder="e.g. Web Development"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-generate">
              Generate Certificate
            </button>
            {generated && (
              <>
                <button
                  type="button"
                  className="btn btn-download"
                  onClick={handleDownload}
                >
                  Download Certificate
                </button>
                <button
                  type="button"
                  className="btn btn-reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* -------- CERTIFICATE PREVIEW -------- */}
      {generated && (
        <div className="preview-section">
          <h2>Certificate Preview</h2>
          <div className="certificate-wrapper" ref={certificateRef}>
            <img
              src={certificateTemplate}
              alt="Certificate Template"
              className="certificate-bg"
              crossOrigin="anonymous"
            />
            <div className="certificate-overlay">
              <p className="certificate-name">{name}</p>
              <p className="certificate-course">{course}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
