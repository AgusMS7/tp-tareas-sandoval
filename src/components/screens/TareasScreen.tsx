import { Header } from '../ui/Header/Header';
import { ListTareas } from '../ui/ListTareas/ListTareas';

export const TareasScreen: React.FC = () => {
  return (
    <div>
      <Header/>
      <ListTareas/>
    </div>
  );
};