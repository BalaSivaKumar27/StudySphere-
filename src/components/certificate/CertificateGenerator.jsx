import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { X, Download, Image, FileText, Link2Icon } from "lucide-react";
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

  const generateCertificateId = () => {
    return `CERT_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  };

  const certificateId = generateCertificateId();

  const downloadCertificate = async (type = "png") => {
    const element = certificateRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    if (type === "png") {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${user.name}_certificate.png`;
      link.click();
    } else {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1200, 1000],
      });
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 1200, 1000);
      pdf.save(`${user.name}_certificate.pdf`);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 scrollable overflow-y-auto max-h-[95vh]">
      <div className="fixed inset-0 bg-black/60" />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl ">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="p-2 text-lg font-semibold">Download Certificate</h2>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-2 p-4 border-b">
            <button
              onClick={() => downloadCertificate("png")}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <Image size={18} />
              Download PNG
            </button>
            <button
              onClick={() => downloadCertificate("pdf")}
              className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              <FileText size={18} />
              Download PDF
            </button>
          </div>

          {/* Certificate Content */}
          <div className="p-8">
            <div ref={certificateRef} className="p-12 text-center bg-white border-4 border-blue-800 ">
          
              
              {/* Academy Name - TOP */}
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-purple-600 uppercase ">StudySphere Academy</h1>
              </div>

              {/* Header */}
              <div className="mb-1">
                <h1 className="mb-1 text-3xl font-bold text-blue-600">Certificate of Excellence</h1>
              </div>

              {/* Awarded To */}
              <div className="my-4">
                <p className="mb-4 text-lg text-gray-600">This certificate is awarded to</p>
                <h2 className="inline-block px-8 pb-4 text-3xl font-bold text-green-800 uppercase border-b-4 border-yellow-500">
                  {user.name}
                </h2>
              </div>

              {/* Course Details */}
              <div className="my-8">
                <p className="mb-4 text-lg text-gray-600">in recognition of successful completion of</p>
                <h3 className="mb-6 text-3xl font-semibold text-indigo-600">"{course.title}"</h3>
                <p className="italic text-gray-600">
                  demonstrating exceptional dedication and outstanding achievement in the field of study
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-4 my-8">
                <div>
                  <div className="font-semibold text-blue-700">COMPLETED ON</div>
                  <div className="text-lg text-blue-900">{completionDate}</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-700">INSTRUCTOR</div>
                  <div className="text-lg text-purple-900">{course.instructor}</div>
                </div>
                <div>
                  <div className="font-semibold text-green-700">DURATION</div>
                  <div className="text-lg text-green-900">{course.duration}</div>
                </div>
              </div>

              {/* Signature & Verification */}
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="mb-2 font-semibold text-orange-700">Authorized Signature</div>
                  <div className="text-lg font-bold text-gray-800">Dr. Sarah Johnson</div>
                  <div className="text-sm text-orange-600">Academic Director</div>
                  <div className="text-xs text-gray-600">StudySphere Global Education</div>
                  <div className="mt-1 text-xs italic text-gray-400">Digitally Signed</div>
                </div>
                <div>
                  <div className="mb-2 font-semibold text-teal-700">Certificate Verification</div>
                  <div className="p-2 mb-2 font-mono text-sm text-blue-800 bg-gray-100 rounded">ID: {certificateId}</div>
                  <div className="text-xs text-purple-600">
                    Verify at: studysphere.com/verify-certificate
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Issued: <span className="text-green-600">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-xs text-gray-500">
                This certificate represents outstanding achievement and dedication to learning excellence
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
