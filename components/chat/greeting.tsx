import { motion } from "framer-motion";

export const Greeting = () => (
  <div className="flex flex-col items-center px-4 text-center" key="overview">
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      สาขาวิชาเทคโนโลยีสารสนเทศ
    </motion.div>
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mt-1 font-medium text-base text-muted-foreground md:text-lg"
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      มหาวิทยาลัยราชภัฏนครศรีธรรมราช
    </motion.div>
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 text-sm text-muted-foreground/80"
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      ระบบแชทบอทอัจฉริยะ ยินดีให้คำปรึกษาและบริการข้อมูล
    </motion.div>
  </div>
);
