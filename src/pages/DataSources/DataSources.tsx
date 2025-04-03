import { useState } from 'react';
import styles from './DataSources.module.css';
import DataSourceCard from './DataSourceCard/DataSourceCard';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

function DataSources() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);

  const handleAddSource = () => {
    const newSource: DataSource = {
      id: Date.now().toString(),
      name: 'Test Source',
      type: 'API',
      status: 'active'
    };

    setDataSources([...dataSources, newSource]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Data Sources</h1>
        <button className={styles.addButton} onClick={handleAddSource}>
          Add New Source
        </button>
      </div>

      <div className={styles.sourcesList}>
        {dataSources.length === 0 ? (
          <div className={styles.emptyState}>
            No data sources found. Add your first source to get started.
          </div>
        ) : (
          dataSources.map((source) => <DataSourceCard source={source} />)
        )}
      </div>
    </div>
  );
}

export default DataSources;
