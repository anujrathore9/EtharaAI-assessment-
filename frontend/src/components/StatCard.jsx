import { motion } from "framer-motion";

const StatCard = ({ label, value, tone }) => {
  const getToneStyles = (tone) => {
    switch (tone) {
      case "border-emerald-300":
        return {
          bg: "from-emerald-50 to-emerald-100",
          border: "border-emerald-200",
          text: "text-emerald-700",
          icon: "📊"
        };
      case "border-amber-300":
        return {
          bg: "from-amber-50 to-amber-100",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: "⏳"
        };
      case "border-rose-300":
        return {
          bg: "from-rose-50 to-rose-100",
          border: "border-rose-200",
          text: "text-rose-700",
          icon: "⚠️"
        };
      default:
        return {
          bg: "from-slate-50 to-slate-100",
          border: "border-slate-200",
          text: "text-slate-700",
          icon: "📋"
        };
    }
  };

  const styles = getToneStyles(tone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${styles.bg} ${styles.border} border-2 p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${styles.text}`}>{value}</p>
        </div>
        <div className="text-4xl opacity-20">{styles.icon}</div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
    </motion.div>
  );
};

export default StatCard;
