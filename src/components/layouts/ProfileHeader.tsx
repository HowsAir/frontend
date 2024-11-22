import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Import the UserContext hook
import { routes } from '../../routes/routes';

const ProfileHeader: React.FC = () => {
    // Use UserContext to access the user data
    const { user } = useUser(); // Access the user data from the context

    // Destructure user data
    const name = user?.name || 'User';
    const photoUrl =
        user?.photoUrl ||
        'https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif';

    return (
        <Link
            to={routes.USER.EDIT_PROFILE}
            className="inline-flex gap-2 rounded-full border-2 border-gray py-1 pl-1 pr-4 no-underline"
        >
            <div className="pointer-events-none inline-flex gap-2">
                <img
                    src={photoUrl}
                    alt={`Foto de ${name}`}
                    className="pointer-events-none size-8 rounded-full border-[1px] border-primary"
                />
                <label className="select-none self-center">{name}</label>
            </div>
        </Link>
    );
};

export default ProfileHeader;
