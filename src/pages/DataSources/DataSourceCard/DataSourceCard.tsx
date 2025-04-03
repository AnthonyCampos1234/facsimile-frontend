import styles from './DataSourceCard.module.css';

interface DataSourceCardProps {
  source: {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive';
  };
}

function DataSourceCard({
  source: { id, name, type, status }
}: DataSourceCardProps) {
  return (
    <div key={id} className={styles.sourceCard}>
      <div className={styles.sourceInfo}>
        <h3>{name}</h3>
        <p>Type: {type}</p>
      </div>
      <div className={styles.sourceStatus}>
        <span className={`${styles.statusDot} ${styles[status]}`} />
        {status}
      </div>
    </div>
  );
}

export default DataSourceCard;
