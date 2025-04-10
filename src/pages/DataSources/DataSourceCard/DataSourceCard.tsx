import styles from './DataSourceCard.module.css';

interface DataSourceCardProps {
  source: {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive';
  };
  onDisconnect: (id: string) => void;
  onReconnect: (id: string) => void;
}

function DataSourceCard({
  source: { id, name, type, status },
  onDisconnect,
  onReconnect
}: DataSourceCardProps) {
  return (
    <div className={styles.sourceCard}>
      <div className={styles.sourceInfo}>
        <h3>{name}</h3>
        <p>Type: {type}</p>
      </div>
      <div className={styles.sourceActions}>
        <div className={styles.sourceStatus}>
          <span className={`${styles.statusDot} ${styles[status]}`} />
          {status}
        </div>
        <button
          onClick={() =>
            status === 'active' ? onDisconnect(id) : onReconnect(id)
          }
          className={
            status === 'active'
              ? styles.disconnectButton
              : styles.reconnectButton
          }
        >
          {status === 'active' ? 'Disconnect' : 'Reconnect'}
        </button>
      </div>
    </div>
  );
}

export default DataSourceCard;
