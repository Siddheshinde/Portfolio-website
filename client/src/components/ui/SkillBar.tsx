import { motion } from 'motion/react';

interface Props {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: Props) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: '#f3e8d8', fontSize: 14, fontWeight: 600 }}>{name}</span>
        <span style={{ color: '#aa8517', fontSize: 13, fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ background: 'rgba(170,133,23,0.15)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #aa8517, #ff9500)', borderRadius: 4 }}
        />
      </div>
    </div>
  );
}
