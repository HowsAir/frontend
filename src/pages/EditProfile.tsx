import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as apiClient from '../api/apiClient';
import { useAppContext } from '../contexts/AppContext';
import { ToastMessageType } from '../types/mainTypes';

const EditProfile = () => {
    const [profile, setProfile] = useState<{
        name: string;
        surnames: string;
        email: string;
        profilePic: string | File; // Can be a string URL or a File
    }>({
        name: 'Mario',
        surnames: 'Luis',
        email: 'marioluis@mail.fake',
        profilePic: '', // Initially a string
    });

    const [originalData, setOriginalData] = useState<{
        name: string;
        surnames: string;
        email: string;
        profilePic: string | File; // Match profile structure
    }>({
        name: 'Mario',
        surnames: 'Luis',
        email: 'marioluis@mail.fake',
        profilePic: '', // Initially a string
    });

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const profile = await apiClient.getUserProfile();

                const profileData = {
                    name: profile.name || 'Nombre',
                    surnames: profile.surnames || 'Apellidos',
                    email: profile.email || 'email@falso.es',
                    profilePic: profile.photoUrl,
                };

                setProfile(profileData);
                setOriginalData(profileData);   
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        getProfileData();
    }, []);

    const { showToast } = useAppContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            if (profile.name) formData.append('name', profile.name);
            if (profile.surnames) formData.append('surnames', profile.surnames);
            if (
                profile.profilePic &&
                profile.profilePic !== originalData.profilePic
            ) {
                formData.append('photo', profile.profilePic as File);
            }

            await apiClient.updateUserProfile(formData);
            alert('Profile updated successfully');
            setOriginalData({ ...profile});
        } catch (error) {
            console.error('Error updating profile:', error);
            showToast({ message: 'Error guardando cambios', type: ToastMessageType.ERROR });
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasChanges =
        profile.name !== originalData.name ||
        profile.surnames !== originalData.surnames ||
        profile.profilePic !== originalData.profilePic;

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex h-fit w-[40dvw] flex-col rounded-lg border-[1px] border-gray bg-white px-20 py-12"
        >
            <h2 className="mx-auto">Editar perfil</h2>
            <div className="relative">
                <img
                    src={
                        typeof profile.profilePic === 'string'
                            ? profile.profilePic // If it's a string, use it directly
                            : URL.createObjectURL(profile.profilePic) // If it's a File, create a URL
                    }
                    className="mx-auto size-40 rounded-full text-center"
                    alt="Foto de perfil"
                />
                <label className="absolute right-32 top-28 w-fit cursor-pointer rounded-full border-4 border-white bg-gray p-2">
                    <img
                        className="size-fit"
                        src="../../public/icons/pencil-icon.svg"
                        alt="Editar"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setProfile({
                                    ...profile,
                                    profilePic: e.target.files[0],
                                });
                            }
                        }}
                        className="hidden"
                    />
                </label>
            </div>

            <p className="mx-auto mt-6 text-lg">{profile.email}</p>

            <div className="grid grid-flow-row grid-cols-2 gap-4">
                <input
                    placeholder="Nombre"
                    className="mt-8 h-10 w-full rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary focus:outline-primary"
                    value={profile.name}
                    onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                    }
                ></input>
                <input
                    placeholder="Apellidos"
                    className="mt-8 h-10 w-full rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary focus:outline-primary"
                    value={profile.surnames}
                    onChange={(e) =>
                        setProfile({ ...profile, surnames: e.target.value })
                    }
                ></input>
            </div>

            <Link
                to="/change-password"
                className="btn-primary mt-8 w-full text-center text-base font-medium"
            >
                Cambiar contraseña
            </Link>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary mt-8 w-full text-base font-medium transition-all duration-300 disabled:bg-gray disabled:text-offblack ${!hasChanges ? 'bg-gray text-offblack' : ''}`}
            >
                {!hasChanges ? 'Cancelar' : isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    );
};

export default EditProfile;
