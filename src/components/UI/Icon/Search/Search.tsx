import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from './selection.json';

function SearchIcon (props: IconProps) {
  return <IcoMoon iconSet={iconSet} {...props} />
}

export default SearchIcon;
