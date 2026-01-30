import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Confetti from "react-confetti";

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
    setConfetti(true);
  };

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  return (
    <>
      <motion.div
        className="p-6 border-4 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transform transition-all relative overflow-hidden"
        style={{
          borderImage: "linear-gradient(135deg, #a855f7, #ec4899, #3b82f6) 1",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleOpen}
      >
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-2">{project.goal}</p>
        <p className="text-sm text-gray-500">
          Tech: {project.technologies.join(", ")}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white rounded-xl font-semibold shadow hover:scale-105 transition transform"
          onClick={handleOpen}
        >
          Explain My Code
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-3xl w-full relative shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{project.goal}</p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Role:</strong> {project.role}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>

              {/* Live Preview for Frontend */}
              {project.live && project.category === "Frontend" && (
                <div className="mt-4 w-full h-64 border rounded-lg overflow-hidden shadow">
                  <iframe
                    src={project.live}
                    className="w-full h-full"
                    title={`${project.title} Live Preview`}
                    sandbox="allow-scripts allow-same-origin"
                  ></iframe>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-indigo-500 hover:underline font-semibold"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-green-500 hover:underline font-semibold"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>

              <button
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 font-bold text-xl"
                onClick={() => setOpen(false)}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
