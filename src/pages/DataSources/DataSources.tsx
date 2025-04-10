import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState('');
  
  const location = useLocation();
  
  // Check connection status when component mounts or after redirect
  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/api/v1/auth/connection/status', {
          credentials: 'include' // Send cookies with the request
        });
        
        if (!response.ok) {
          throw new Error('Failed to check connection status');
        }
        
        const data = await response.json();
        
        if (data.isConnected) {
          // If Google services are connected, add them to data sources
          const connectedSources: DataSource[] = [];
          
          // Check which scopes are available
          const scopes = data.scopes || [];
          
          if (scopes.includes('https://www.googleapis.com/auth/gmail.readonly')) {
            connectedSources.push({
              id: 'gmail-' + Date.now(),
              name: 'Gmail',
              type: 'google-services',
              status: 'active'
            });
          }
          
          if (scopes.includes('https://www.googleapis.com/auth/calendar.readonly')) {
            connectedSources.push({
              id: 'calendar-' + Date.now(),
              name: 'Google Calendar',
              type: 'google-services',
              status: 'active'
            });
          }
          
          setDataSources(connectedSources);
        }
      } catch (error) {
        console.error('Error checking connection status:', error);
        setConnectionError('Failed to check connection status. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check if we're returning from a successful connection
    if (location.pathname === '/connect/success') {
      checkConnectionStatus();
    } else {
      checkConnectionStatus();
    }
  }, [location.pathname]);

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
        {isLoading ? (
          <div className={styles.loadingState}>Loading data sources...</div>
        ) : connectionError ? (
          <div className={styles.errorState}>{connectionError}</div>
        ) : dataSources.length === 0 ? (
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
