import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../api/apiClient'; // Adjust the import path as needed
import { routes } from '../../routes/routes';
import { Link } from 'react-router-dom';

interface UserProfile {
    name: string;
    photoUrl: string;
    // Include any other fields returned by the API if necessary
}

const ProfileHeader: React.FC = () => {
    const [name, setName] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile: UserProfile = await getUserProfile();
                setName(userProfile.name);
                setPhotoUrl(userProfile.photoUrl);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    

    return (
        <Link to={routes.USER.INDEX} className="inline-flex gap-2 rounded-full border-2 border-gray pl-1 pr-4 py-1 no-underline">
            <div className="pointer-events-none inline-flex gap-2">
            <img
                src={photoUrl || ''}
                alt={`Foto de ${name || 'User'}`}
                className="size-8 rounded-full border-[1px] border-primary pointer-events-none"
            />
            <label className='self-center select-none'>{name || 'User'}</label>
            </div>
        </Link>
    );
};

export default ProfileHeader;
