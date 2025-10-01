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
        <Dialog.Panel className="relative w-full max-w-2xl overflow-hidden border-4 border-blue-300 shadow-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl dark:border-blue-600">
          {/* Stunning Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
            {/* Floating geometric shapes */}
            <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-pulse"></div>
            <div className="absolute w-16 h-16 rounded-full top-20 right-16 bg-gradient-to-br from-pink-400/10 to-red-400/10 animate-bounce"></div>
            <div className="absolute w-24 h-24 rounded-full bottom-20 left-16 bg-gradient-to-br from-green-400/10 to-blue-400/10 animate-pulse"></div>
            <div className="absolute rounded-full bottom-10 right-10 w-18 h-18 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 animate-bounce"></div>
          </div>

          {/* Corner decorations */}
          <div className="absolute w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-lg top-3 left-3 dark:border-blue-400"></div>
          <div className="absolute w-6 h-6 border-t-2 border-r-2 border-blue-500 rounded-tr-lg top-3 right-3 dark:border-blue-400"></div>
          <div className="absolute w-6 h-6 border-b-2 border-l-2 border-blue-500 rounded-bl-lg bottom-3 left-3 dark:border-blue-400"></div>
          <div className="absolute w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-lg bottom-3 right-3 dark:border-blue-400"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    Course Completed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Amazing achievement! 🚀
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-all duration-200 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Main Content */}
            <div className="p-8 text-center">
              {/* Celebration Icon */}
              <div className="mb-6">
                <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 animate-bounce">
                  <span className="text-4xl">🎓</span>
                </div>
              </div>

              <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
                Congratulations!
              </h2>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                You have successfully completed{" "}
                <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  {course.title}
                </span>
              </p>

              {/* Achievement Badge */}
              <div className="p-4 mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl dark:border-blue-600">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                  <span>Certificate of Completion Generated</span>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={onViewCertificate}
                  className="flex items-center justify-center px-8 py-4 space-x-3 font-bold text-white transition-all duration-300 transform shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>View & Download Certificate</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-4 font-bold text-gray-700 transition-all duration-300 transform border-2 border-gray-300 shadow-lg dark:border-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:scale-105"
                >
                  Close
                </button>
              </div>

              {/* Verification Note */}
              <div className="p-4 mt-6 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl dark:border-green-600">
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