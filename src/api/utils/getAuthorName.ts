import { User } from 'firebase/auth';

const getAuthorName = (user: User | undefined) => user?.displayName || 'Anonymous';

export default getAuthorName;
