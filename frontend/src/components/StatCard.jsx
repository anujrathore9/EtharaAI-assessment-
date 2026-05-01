import { motion } from "framer-motion";

const StatCard = ({ label, value, tone }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-xl border bg-white p-4 shadow-sm ${tone}`}
  >
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold">{value}</p>
  </motion.div>
);

export default StatCard;
