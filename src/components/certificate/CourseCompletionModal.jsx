import { Dialog } from "@headlessui/react";
import { X, Award, Download } from "lucide-react";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function CourseCompletionModal({
  isOpen,
  onClose,
  course,
  onViewCertificate,
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} gravity={0.3} />}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="relative w-full max-w-2xl overflow-hidden bg-white border border-gray-300 shadow-2xl dark:bg-gray-900 rounded-xl dark:border-gray-700">
          {/* Simple Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"></div>

          {/* Corner decorations - removed */}

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Course Completed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Amazing achievement!
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Main Content */}
            <div className="p-8 text-center">
              {/* Celebration Icon */}
              <div className="mb-6">
                <div className="flex items-center justify-center w-24 h-24 mx-auto bg-blue-100 rounded-full dark:bg-blue-900">
                  <span className="text-4xl">🎓</span>
                </div>
              </div>

              <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
                Congratulations!
              </h2>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                You have successfully completed{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {course.title}
                </span>
              </p>

              {/* Achievement Badge */}
              <div className="p-4 mb-8 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>✓ Certificate of Completion Generated</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={onViewCertificate}
                  className="flex items-center justify-center px-8 py-4 space-x-3 font-bold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-5 h-5" />
                  <span>View & Download Certificate</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-4 font-bold text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Close
                </button>
              </div>

              {/* Verification Note */}
              <div className="p-4 mt-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  <strong className="text-green-600 dark:text-green-400">✓ Verified Achievement:</strong>{" "}
                  This certificate can be verified through StudySphere Academy
                </p>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}