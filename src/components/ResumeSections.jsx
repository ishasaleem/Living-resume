import React from "react";
import { motion } from "framer-motion";

// Container animation: stagger children
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

// Each card animation: fade + slide + scale
const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.7 } },
};

// Floating effect for some elements
const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function ResumeSections({ educationData, experienceData, achievementsData }) {
  return (
    <motion.div
      className="space-y-20"
      variants={container}
      initial="hidden"
      animate="visible"
    >

      {/* EDUCATION */}
      <motion.section variants={card} className="relative">
        <h2 className="mb-8 text-3xl font-bold text-center text-indigo-600">
          Education
        </h2>
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={container}
        >
          {educationData.map((edu, i) => (
            <motion.div
              key={i}
              className="p-6 border shadow-lg rounded-2xl bg-white/70 backdrop-blur-lg"
              variants={card}
              whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xl font-bold text-indigo-500">{edu.degree}</h3>
              <p className="text-gray-700">{edu.institution}</p>
              <p className="text-gray-600">CGPA: {edu.cgpa}</p>
              <p className="text-gray-600">{edu.duration}</p>
              <ul className="mt-2 ml-6 text-gray-700 list-disc">
                {edu.coursework.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section variants={card} className="relative">
        <h2 className="mb-8 text-3xl font-bold text-center text-purple-600">
          Experience
        </h2>
        <motion.div className="grid gap-8 md:grid-cols-2" variants={container}>
          {experienceData.map((exp, i) => (
            <motion.div
              key={i}
              className="p-6 border shadow-lg rounded-2xl bg-white/70 backdrop-blur-lg"
              variants={card}
              whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xl font-bold text-purple-500">{exp.role} @ {exp.company}</h3>
              <p className="text-gray-600">{exp.duration}</p>
              <ul className="mt-2 ml-6 text-gray-700 list-disc">
                {exp.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ACHIEVEMENTS */}
      <motion.section variants={card} className="relative">
        <h2 className="mb-8 text-3xl font-bold text-center text-pink-600">
          Achievements
        </h2>
        <motion.div className="grid gap-6 md:grid-cols-2" variants={container}>
          {achievementsData.map((ach, i) => (
            <motion.div
              key={i}
              className="p-4 text-center border shadow-lg rounded-2xl bg-white/70 backdrop-blur-lg"
              variants={card}
              whileHover={{ y: -6, scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              animate={float.animate}
            >
              <p className="font-bold text-pink-500">{ach.title}</p>
              <p className="text-sm text-gray-500">{ach.date}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
