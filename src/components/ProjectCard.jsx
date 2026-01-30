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
        className="relative p-6 overflow-hidden transition-all transform border-4 shadow-lg cursor-pointer rounded-2xl hover:scale-105"
        style={{
          borderImage: "linear-gradient(135deg, #a855f7, #ec4899, #3b82f6) 1",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleOpen}
      >
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
        <p className="mb-2 text-gray-600">{project.goal}</p>
        <p className="text-sm text-gray-500">
          Tech: {project.technologies.join(", ")}
        </p>
        <button
          className="px-4 py-2 mt-4 font-semibold text-white transition transform shadow bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-xl hover:scale-105"
          onClick={handleOpen}
        >
          Explain My Code
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            <motion.div
              className="relative w-full max-w-3xl p-8 bg-white shadow-2xl dark:bg-gray-900 rounded-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-4 text-2xl font-bold">{project.title}</h2>
              <p className="mb-2 text-gray-600 dark:text-gray-300">{project.goal}</p>
              <p className="mb-4 text-sm text-gray-500">
                <strong>Role:</strong> {project.role}
              </p>
              <p className="mb-4 text-sm text-gray-500">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>

              {/* Live Preview for Frontend */}
              {project.live && project.category === "Frontend" && (
                <div className="w-full h-64 mt-4 overflow-hidden border rounded-lg shadow">
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
                    className="flex items-center gap-2 font-semibold text-indigo-500 hover:underline"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-semibold text-green-500 hover:underline"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>

              <button
                className="absolute text-xl font-bold text-gray-600 top-4 right-4 dark:text-gray-300"
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
