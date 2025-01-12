import { Provider } from 'react-redux';
import TravelForm from './components/TravelForm';
import store from './redux/store';
import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <main className={styles['main-wrapper']}>
        <TravelForm />
      </main>
    </Provider>
  );
}

export default App;
