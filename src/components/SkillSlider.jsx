import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function SkillSlider({ name, level, usageCount, description, onClick }) {
  return (
    <Tippy content={
      <div className="text-sm">
        <p><strong>{name}</strong></p>
        <p>Level: {level}</p>
        {description && <p>{description}</p>}
        {usageCount > 0 && <p>Used in {usageCount} project(s)</p>}
      </div>
    }>
      <motion.div
        
        className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg cursor-pointer dark:bg-gray-800 hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-20 h-20">
          <CircularProgressbar
            value={usageCount > 0 ? usageCount * 10 : 0}
            text={`${level}`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: `rgba(139,92,246, ${usageCount > 0 ? 0.8 : 0.3})`,
              textColor: '#8b5cf6',
              trailColor: '#ddd',
            })}
          />
        </div>
        <p className="mt-2 font-semibold">{name}</p>
      </motion.div>
    </Tippy>
  );
}
