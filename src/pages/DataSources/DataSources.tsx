import { useState } from 'react';
import styles from './DataSources.module.css';
import DataSourceCard from './DataSourceCard/DataSourceCard';
import Modal from './Modal/Modal';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

function DataSources() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSource = (sourceType: string) => {
    const newSource: DataSource = {
      id: Date.now().toString(),
      name: sourceType === 'gmail' ? 'Gmail' : 'Google Calendar',
      type: sourceType,
      status: 'active'
    };

    setDataSources([...dataSources, newSource]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Data Sources</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Source
        </button>
      </div>

      <div className={styles.sourcesList}>
        {dataSources.length === 0 ? (
          <div className={styles.emptyState}>
            No data sources found. Add your first source to get started.
          </div>
        ) : (
          dataSources.map((source) => (
            <DataSourceCard key={source.id} source={source} />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSource}
      />
    </div>
  );
}

export default DataSources;
