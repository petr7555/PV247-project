import { User } from 'firebase/auth';

const getAuthorName = (user: User | undefined) => user?.email?.split('@')[0] || 'Anonymous';

export default getAuthorName;
