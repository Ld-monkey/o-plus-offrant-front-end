import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from './selection.json';

function UserIcon (props: IconProps) {
  return <IcoMoon iconSet={iconSet} {...props} />
}

export default UserIcon;
