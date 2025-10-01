import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import {
  X,
  Image,
  FileText,
  Shield,
  Award,
  Star,
  Calendar,
  User,
  Clock,
  Loader,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificateGenerator({
  isOpen,
  onClose,
  course,
  user,
  completionDate,
}) {
  const certificateRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const generateCertificateId = () => {
    return `CERT_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  };

  const certificateId = generateCertificateId();

  const downloadCertificate = async (type = "png") => {
    setIsDownloading(true);
    
    try {
      const element = certificateRef.current;
      
      // A4 Size Perfect Fit - 3508 x 2480 pixels (300 DPI)
      const EXPORT_WIDTH = 3508;
      const EXPORT_HEIGHT = 2480;
      
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-10000px';
      tempContainer.style.top = '0';
      tempContainer.style.width = EXPORT_WIDTH + 'px';
      tempContainer.style.height = EXPORT_HEIGHT + 'px';
      tempContainer.style.background = '#ffffff';
      tempContainer.style.zIndex = '9999';
      
      const clone = element.cloneNode(true);
      
      // FULL A4 SIZE
      clone.style.width = EXPORT_WIDTH + 'px';
      clone.style.height = EXPORT_HEIGHT + 'px';
      clone.style.margin = '0';
      clone.style.padding = '200px 150px'; // Perfect padding for A4
      clone.style.background = '#ffffff';
      clone.style.position = 'relative';
      clone.style.transform = 'none';
      clone.style.overflow = 'visible';
      
      // SCALE UP ALL TEXT AND ELEMENTS FOR A4
      const scaleElements = (element) => {
        const elements = element.querySelectorAll('*');
        elements.forEach(el => {
          const computedStyle = window.getComputedStyle(el);
          const currentFontSize = parseFloat(computedStyle.fontSize);
          
          if (currentFontSize > 0) {
            // Scale factor for A4 (approx 3x for perfect readability)
            el.style.fontSize = (currentFontSize * 3) + 'px';
          }
          
          // Scale padding and margins
          ['padding', 'margin', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 
           'marginTop', 'marginBottom', 'marginLeft', 'marginRight'].forEach(prop => {
            const value = computedStyle[prop];
            if (value && value !== '0px') {
              const numValue = parseFloat(value);
              if (!isNaN(numValue) && numValue > 0) {
                el.style[prop] = (numValue * 2.5) + 'px';
              }
            }
          });
        });
      };

      scaleElements(clone);

      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.transform = 'none';
        el.style.boxSizing = 'border-box';
      });

      tempContainer.appendChild(clone);
      document.body.appendChild(tempContainer);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(tempContainer, {
        scale: 1, // No extra scale needed since we're using exact A4 dimensions
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: false,
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        scrollX: 0,
        scrollY: 0
      });

      document.body.removeChild(tempContainer);

      if (type === "png") {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png", 1.0);
        const safeName = `${user.name || 'Student'}_${course.title || 'Course'}`.replace(/\s+/g, '_');
        link.download = `${safeName}_Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const imgData = canvas.toDataURL("image/png", 1.0);
        
        // PERFECT A4 PDF
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [EXPORT_WIDTH, EXPORT_HEIGHT]
        });

        pdf.addImage(imgData, "PNG", 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);
        const safeName = `${user.name || 'Student'}_${course.title || 'Course'}`.replace(/\s+/g, '_');
        pdf.save(`${safeName}_Certificate.pdf`);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="relative flex flex-col w-full max-w-[90vw] max-h-[95vh] bg-white rounded-xl shadow-2xl overflow-hidden">
          <button
            onClick={onClose}
            disabled={isDownloading}
            className="absolute z-20 p-2 text-gray-500 transition-all duration-300 rounded-full top-4 right-4 hover:text-red-600 bg-white/80 hover:bg-red-50 disabled:opacity-50"
          >
            <X size={24} />
          </button>

          <div className="absolute z-20 flex gap-3 top-4 left-4">
            <button
              onClick={() => downloadCertificate("png")}
              disabled={isDownloading}
              className="relative p-3 text-white transition-all duration-300 rounded-full shadow-lg group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-110 hover:shadow-xl active:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download PNG"
            >
              {isDownloading ? <Loader size={22} className="animate-spin" /> : <Image size={22} />}
              <span className="absolute px-2 py-1 mb-2 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100 whitespace-nowrap">
                Download PNG
              </span>
            </button>
            <button
              onClick={() => downloadCertificate("pdf")}
              disabled={isDownloading}
              className="relative p-3 text-white transition-all duration-300 rounded-full shadow-lg group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-110 hover:shadow-xl active:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download PDF"
            >
              {isDownloading ? <Loader size={22} className="animate-spin" /> : <FileText size={22} />}
              <span className="absolute px-2 py-1 mb-2 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100 whitespace-nowrap">
                Download PDF
              </span>
            </button>
          </div>

          {isDownloading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 p-6 bg-white shadow-2xl rounded-2xl">
                <Loader size={32} className="text-blue-600 animate-spin" />
                <div className="text-lg font-semibold text-gray-800">
                  Generating Certificate...
                </div>
                <div className="text-sm text-gray-600">
                  Please wait while we create your certificate
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-center min-h-full">
              <div
                ref={certificateRef}
                className="w-full max-w-4xl bg-white border-[20px] shadow-2xl flex flex-col items-center justify-center text-center p-12"
                style={{
                  borderImage: "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899) 1",
                  borderWidth: "20px",
                  borderStyle: "solid",
                  minHeight: "700px",
                  background: "linear-gradient(135deg, #f0f9ff 0%, #fdf2f8 100%)",
                }}
              >
                {/* Header */}
                <div className="mb-12">
                  <h1 className="mb-4 font-serif text-5xl font-bold text-blue-800">Certificate</h1>
                  <h2 className="text-2xl italic font-semibold text-purple-600">of Excellence</h2>
                </div>

                {/* Institution */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-blue-700">StudySphere Academy</h3>
                  <p className="text-gray-600 text-md">Accredited Learning Institution</p>
                </div>

                {/* Awarded to */}
                <div className="mb-12">
                  <p className="mb-6 text-lg text-gray-600">This certificate is awarded to</p>
                  <h2 className="px-12 pb-3 font-serif text-4xl font-bold text-blue-800 border-b-4 border-yellow-400">
                    {user.name}
                  </h2>
                </div>

                {/* Course */}
                <div className="mb-12">
                  <p className="mb-4 text-lg text-gray-600">in recognition of successful completion of</p>
                  <h3 className="px-8 py-4 text-2xl font-bold text-gray-800 border-2 border-green-200 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    "{course.title}"
                  </h3>
                  <p className="max-w-3xl mt-4 italic text-gray-600 text-md">
                    demonstrating exceptional dedication and outstanding achievement in the field of study
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid w-full max-w-4xl grid-cols-1 gap-6 mb-12 md:grid-cols-3">
                  <div className="p-4 border-2 border-blue-200 shadow-md bg-blue-50 rounded-xl">
                    <div className="mb-2 text-sm font-semibold text-blue-700">COMPLETED ON</div>
                    <div className="text-lg font-bold text-blue-900">{completionDate}</div>
                  </div>
                  
                  <div className="p-4 border-2 border-purple-200 shadow-md bg-purple-50 rounded-xl">
                    <div className="mb-2 text-sm font-semibold text-purple-700">INSTRUCTOR</div>
                    <div className="text-lg font-bold text-purple-900">{course.instructor}</div>
                  </div>
                  
                  <div className="p-4 border-2 border-green-200 shadow-md bg-green-50 rounded-xl">
                    <div className="mb-2 text-sm font-semibold text-green-700">DURATION</div>
                    <div className="text-lg font-bold text-green-900">{course.duration || "10 weeks"}</div>
                  </div>
                </div>

                {/* Signature & Verification */}
                <div className="grid w-full max-w-4xl grid-cols-1 gap-8 mb-8 md:grid-cols-2">
                  <div className="p-5 border-2 border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                    <div className="mb-3 text-lg font-bold text-orange-800">Authorized Signature</div>
                    <div className="mb-1 text-xl font-bold text-gray-800">Dr. Sarah Johnson</div>
                    <div className="mb-1 font-semibold text-orange-700">Academic Director</div>
                    <div className="text-sm text-gray-600">StudySphere Global Education</div>
                    <div className="mt-2 text-xs italic text-gray-500">(Digitally Signed)</div>
                  </div>
                  
                  <div className="p-5 border-2 border-gray-300 shadow-lg bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
                    <div className="mb-3 text-lg font-bold text-gray-800">Certificate Verification</div>
                    <div className="p-3 mb-3 bg-white border-2 border-blue-200 rounded-lg shadow-sm">
                      <div className="font-mono font-bold text-blue-800 break-all">ID: {certificateId}</div>
                    </div>
                    <div className="mb-1 text-sm text-gray-600">Verify authenticity at:</div>
                    <div className="mb-2 text-sm font-semibold text-purple-700">studysphere.com/verify-certificate</div>
                    <div className="text-sm text-gray-500">
                      Issued: {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-6 mb-6">
                  <span className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-yellow-800 bg-yellow-100 border-2 border-yellow-300 rounded-full shadow-md">
                    <Award size={16} className="text-yellow-600" />
                    Gold Standard
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-800 bg-blue-100 border-2 border-blue-300 rounded-full shadow-md">
                    <Shield size={16} className="text-blue-600" />
                    Verified
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-800 bg-green-100 border-2 border-green-300 rounded-full shadow-md">
                    <Star size={16} className="text-green-600" />
                    Excellence
                  </span>
                </div>

                {/* Footer */}
                <div className="pt-4 text-sm italic text-gray-500 border-t border-gray-200">
                  This certificate represents outstanding achievement and dedication to learning excellence
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

CertificateGenerator.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  course: PropTypes.shape({
    title: PropTypes.string,
    instructor: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  completionDate: PropTypes.string.isRequired,
};